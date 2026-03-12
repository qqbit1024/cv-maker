import { useEffect, useRef, useState } from "react";
import fontUrl from "../../fonts/helvetica_regular.otf";
import {
  getInterfaceLanguageOptions,
  getLanguageLevelOptions,
  getResumeLanguageLabel,
  uiText,
} from "../i18n/uiText";
import { createResumePdf } from "../lib/pdfTemplate";
import type {
  CourseEntry,
  Direction,
  InterfaceLanguageCode,
  ImportTarget,
  Job,
  JobTask,
  LanguageOption,
  ModalType,
  ResumeData,
  ResumeLanguageCode,
  ResumeProgressItem,
  SkillsData,
  ThemeMode,
} from "../types/resume";
import { downloadBlob, readJsonFile } from "../utils/files";
import {
  clone,
  createResumeLanguageCode,
  createEmptyCourseEntry,
  createEmptyJob,
  createEmptyJobTask,
  createEmptyLanguageItem,
  ensurePdfFileName,
  getDefaultResumeForLanguage,
  getDefaultPdfFileName,
  getDefaultSkills,
  getDefaultState,
  getResumeCompletion,
  joinContactItems,
  joinLanguageItems,
  loadState,
  moveItem,
  normalizeResume,
  normalizeSkills,
  STORAGE_KEY,
} from "../utils/resumeState";

const THEME_STORAGE_KEY = "resume-studio-theme-v1";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

type JobCollectionKey = "jobs" | "_commentedJobs";
type TaskCollectionKey = "tasks" | "_commentedTasks";
type EducationCollectionKey = "entries" | "_commentedEntries";
type CertificatesCollectionKey = "items" | "_commentedItems";

function getJobVisibility(collectionKey: JobCollectionKey): boolean {
  return collectionKey === "_commentedJobs";
}

function findJobSourceIndex(
  jobs: Job[],
  collectionKey: JobCollectionKey,
  jobIndex: number
): number {
  const targetHidden = getJobVisibility(collectionKey);
  let currentIndex = -1;

  for (let sourceIndex = 0; sourceIndex < jobs.length; sourceIndex += 1) {
    if (Boolean(jobs[sourceIndex].hidden) !== targetHidden) {
      continue;
    }

    currentIndex += 1;

    if (currentIndex === jobIndex) {
      return sourceIndex;
    }
  }

  return -1;
}

function getTaskVisibility(collectionKey: TaskCollectionKey): boolean {
  return collectionKey === "_commentedTasks";
}

function findTaskSourceIndex(
  tasks: JobTask[],
  collectionKey: TaskCollectionKey,
  taskIndex: number
): number {
  const targetHidden = getTaskVisibility(collectionKey);
  let currentIndex = -1;

  for (let sourceIndex = 0; sourceIndex < tasks.length; sourceIndex += 1) {
    if (Boolean(tasks[sourceIndex].hidden) !== targetHidden) {
      continue;
    }

    currentIndex += 1;

    if (currentIndex === taskIndex) {
      return sourceIndex;
    }
  }

  return -1;
}

function getCertificateVisibility(collectionKey: CertificatesCollectionKey): boolean {
  return collectionKey === "_commentedItems";
}

function findCertificateSourceIndex(
  items: CourseEntry[],
  collectionKey: CertificatesCollectionKey,
  entryIndex: number
): number {
  const targetHidden = getCertificateVisibility(collectionKey);
  let currentIndex = -1;

  for (let sourceIndex = 0; sourceIndex < items.length; sourceIndex += 1) {
    if (Boolean(items[sourceIndex].hidden) !== targetHidden) {
      continue;
    }

    currentIndex += 1;

    if (currentIndex === entryIndex) {
      return sourceIndex;
    }
  }

  return -1;
}

export function useResumeStudio() {
  const initialState = loadState();
  const [uiLanguage, setUiLanguage] = useState<InterfaceLanguageCode>("ru");
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeLanguage, setActiveLanguage] = useState<ResumeLanguageCode>(
    initialState.resumes.ru ? "ru" : (Object.keys(initialState.resumes)[0] ?? "ru")
  );
  const [resumes, setResumes] = useState(initialState.resumes);
  const [skills, setSkills] = useState(initialState.skills);
  const [pdfFileNames, setPdfFileNames] = useState(initialState.pdfFileNames);
  const [resumeLanguageLabels, setResumeLanguageLabels] = useState(
    initialState.resumeLanguageLabels
  );
  const [status, setStatus] = useState(uiText.ru.statusReady);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [pendingImportTarget, setPendingImportTarget] = useState<ImportTarget | null>(null);
  const [isCreateResumeLanguageModalOpen, setIsCreateResumeLanguageModalOpen] = useState(false);
  const [newResumeLanguageName, setNewResumeLanguageName] = useState("");
  const [pendingResumeLanguageDuplicate, setPendingResumeLanguageDuplicate] =
    useState<ResumeLanguageCode | null>(null);
  const [duplicateResumeLanguageName, setDuplicateResumeLanguageName] = useState("");
  const [pendingResumeLanguageRename, setPendingResumeLanguageRename] =
    useState<ResumeLanguageCode | null>(null);
  const [renameResumeLanguageName, setRenameResumeLanguageName] = useState("");
  const [pendingResumeLanguageDeletion, setPendingResumeLanguageDeletion] =
    useState<ResumeLanguageCode | null>(null);
  const [didAutoSave, setDidAutoSave] = useState(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const hasInitializedAutoSaveRef = useRef(false);
  const t = uiText[uiLanguage];

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
        JSON.stringify({
          resumes,
          skills,
          pdfFileNames,
          resumeLanguageLabels,
        })
    );

    if (!hasInitializedAutoSaveRef.current) {
      hasInitializedAutoSaveRef.current = true;
      return;
    }

    setDidAutoSave(true);
    const timeoutId = window.setTimeout(() => setDidAutoSave(false), 1400);
    return () => window.clearTimeout(timeoutId);
  }, [resumes, skills, pdfFileNames, resumeLanguageLabels]);

  useEffect(() => {
    document.title = "cv-maker";
    document.documentElement.lang = uiLanguage;
  }, [uiLanguage]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (!resumes[activeLanguage]) {
      setActiveLanguage(Object.keys(resumes)[0] ?? "ru");
    }
  }, [activeLanguage, resumes]);

  const resume = resumes[activeLanguage] ?? getDefaultResumeForLanguage("ru");
  const defaultResume = getDefaultResumeForLanguage(activeLanguage);
  const certificates = resume.sections.certificates;
  const jobs = resume.sections.experience.jobs.filter((job) => !job.hidden);
  const hiddenJobs = resume.sections.experience.jobs.filter((job) => job.hidden);
  const hiddenEducationEntries = resume.sections.education._commentedEntries ?? [];
  const certificateEntries = certificates.items.filter((item) => !item.hidden);
  const hiddenCertificateEntries = certificates.items.filter((item) => item.hidden);
  const contactItems = resume.header.contacts ?? [];
  const languageItems = resume.sections.languages.items ?? [createEmptyLanguageItem()];
  const activeResumeLanguageLabel = getResumeLanguageLabel(
    activeLanguage,
    uiLanguage,
    resumeLanguageLabels
  );
  const pdfFileName = pdfFileNames[activeLanguage] ?? getDefaultPdfFileName(activeLanguage);
  const languageLevelOptions = getLanguageLevelOptions(uiLanguage);
  const totalContacts = contactItems.filter((item) => String(item ?? "").trim()).length;
  const totalEducation = resume.sections.education.entries.filter((entry) =>
    String(entry.course ?? "").trim()
  ).length;
  const totalCertificates = certificateEntries.filter((entry) =>
    String(entry.course ?? "").trim()
  ).length;
  const totalLanguages = languageItems.filter(
    (item) => String(item.name ?? "").trim() || String(item.level ?? "").trim()
  ).length;
  const totalSkills = skills.items.filter((item) => String(item ?? "").trim()).length;
  const interfaceLanguageOptions: LanguageOption[] = getInterfaceLanguageOptions(uiLanguage);
  const defaultSkills = getDefaultSkills();
  const resumeProgressItems: ResumeProgressItem[] = Object.keys(resumes).map((language) => ({
    language,
    label: getResumeLanguageLabel(language, uiLanguage, resumeLanguageLabels),
    ...getResumeCompletion(
      resumes[language],
      skills,
      getDefaultResumeForLanguage(language),
      defaultSkills
    ),
  }));

  const hasResumeLanguageLabelCollision = (
    label: string,
    ignoredLanguage?: ResumeLanguageCode
  ) => {
    const normalizedLabel = label.trim().toLowerCase();

    if (!normalizedLabel) {
      return false;
    }

    return Object.keys(resumes).some((language) => {
      if (language === ignoredLanguage) {
        return false;
      }

      return (
        getResumeLanguageLabel(language, uiLanguage, resumeLanguageLabels)
          .trim()
          .toLowerCase() === normalizedLabel
      );
    });
  };

  const updateResume = (
    language: ResumeLanguageCode,
    updater: (current: ResumeData) => ResumeData
  ) => {
    setResumes((current) => ({
      ...current,
      [language]: updater(current[language]),
    }));
  };

  const updateActiveResume = (updater: (current: ResumeData) => ResumeData) => {
    updateResume(activeLanguage, updater);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const updateHeader = (field: "name" | "title", value: string) => {
    updateActiveResume((current) => ({
      ...current,
      header: {
        ...current.header,
        [field]: value,
      },
    }));
  };

  const updateSummary = (value: string) => {
    updateActiveResume((current) => ({
      ...current,
      sections: {
        ...current.sections,
        summary: {
          ...current.sections.summary,
          content: value,
        },
      },
    }));
  };

  const updateSectionTitle = (
    sectionKey: "summary" | "experience" | "education" | "languages" | "skills" | "certificates",
    value: string
  ) => {
    updateActiveResume((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [sectionKey]: {
          ...current.sections[sectionKey],
          title: value,
        },
      },
    }));
  };

  const setContactItems = (items: string[]) => {
    updateActiveResume((current) => ({
      ...current,
      header: {
        ...current.header,
        contacts: items,
        contact: joinContactItems(items),
      },
    }));
  };

  const updateContactItem = (contactIndex: number, value: string) => {
    const items = [...contactItems];
    items[contactIndex] = value;
    setContactItems(items);
  };

  const addContactItem = () => {
    setContactItems([...contactItems, ""]);
  };

  const removeContactItem = (contactIndex: number) => {
    const items = contactItems.filter((_, index) => index !== contactIndex);
    setContactItems(items.length ? items : [""]);
  };

  const reorderContactItems = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= contactItems.length ||
      toIndex >= contactItems.length
    ) {
      return;
    }

    const items = [...contactItems];
    const [movedItem] = items.splice(fromIndex, 1);

    if (typeof movedItem === "undefined") {
      return;
    }

    items.splice(toIndex, 0, movedItem);
    setContactItems(items);
  };

  const updatePdfFileName = (value: string) => {
    setPdfFileNames((current) => ({
      ...current,
      [activeLanguage]: value,
    }));
  };

  const updateExperienceCollection = (updater: (jobs: Job[]) => Job[]) => {
    updateActiveResume((current) => ({
      ...current,
      sections: {
        ...current.sections,
        experience: {
          ...current.sections.experience,
          jobs: updater(current.sections.experience.jobs ?? []),
        },
      },
    }));
  };

  const updateJobField = (
    collectionKey: JobCollectionKey,
    jobIndex: number,
    field: "title" | "company" | "period",
    value: string
  ) => {
    updateExperienceCollection((jobsCollection) => {
      const sourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (sourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) =>
        index === sourceIndex ? { ...job, [field]: value } : job
      );
    });
  };

  const updateTask = (
    collectionKey: JobCollectionKey,
    jobIndex: number,
    taskCollectionKey: TaskCollectionKey,
    taskIndex: number,
    value: string
  ) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) => {
        if (index !== jobSourceIndex) {
          return job;
        }

        const taskSourceIndex = findTaskSourceIndex(job.tasks, taskCollectionKey, taskIndex);

        if (taskSourceIndex === -1) {
          return job;
        }

        return {
          ...job,
          tasks: job.tasks.map((task, currentTaskIndex) =>
            currentTaskIndex === taskSourceIndex ? { ...task, text: value } : task
          ),
        };
      });
    });
  };

  const addTask = (
    collectionKey: JobCollectionKey,
    jobIndex: number,
    taskCollectionKey: TaskCollectionKey = "tasks"
  ) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) =>
        index === jobSourceIndex
          ? {
              ...job,
              tasks: [...job.tasks, createEmptyJobTask(getTaskVisibility(taskCollectionKey))],
            }
          : job
      );
    });
  };

  const removeTask = (
    collectionKey: JobCollectionKey,
    jobIndex: number,
    taskCollectionKey: TaskCollectionKey,
    taskIndex: number
  ) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) => {
        if (index !== jobSourceIndex) {
          return job;
        }

        const taskSourceIndex = findTaskSourceIndex(job.tasks, taskCollectionKey, taskIndex);

        if (taskSourceIndex === -1) {
          return job;
        }

        const nextTasks = job.tasks.filter((_, currentTaskIndex) => currentTaskIndex !== taskSourceIndex);
        return {
          ...job,
          tasks: nextTasks.length
            ? nextTasks
            : [createEmptyJobTask(getTaskVisibility(taskCollectionKey))],
        };
      });
    });
  };

  const reorderTask = (
    collectionKey: JobCollectionKey,
    jobIndex: number,
    taskCollectionKey: TaskCollectionKey,
    fromIndex: number,
    toIndex: number
  ) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) => {
        if (index !== jobSourceIndex) {
          return job;
        }

        const targetHidden = getTaskVisibility(taskCollectionKey);
        const filteredTasks = job.tasks.filter((task) => Boolean(task.hidden) === targetHidden);

        if (
          fromIndex === toIndex ||
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= filteredTasks.length ||
          toIndex >= filteredTasks.length
        ) {
          return job;
        }

        const reorderedTasks = [...filteredTasks];
        const [movedTask] = reorderedTasks.splice(fromIndex, 1);

        if (!movedTask) {
          return job;
        }

        reorderedTasks.splice(toIndex, 0, movedTask);

        let filteredCursor = 0;
        return {
          ...job,
          tasks: job.tasks.map((task) => {
            if (Boolean(task.hidden) !== targetHidden) {
              return task;
            }

            const nextTask = reorderedTasks[filteredCursor];
            filteredCursor += 1;
            return nextTask ?? task;
          }),
        };
      });
    });
  };

  const addJob = (collectionKey: JobCollectionKey = "jobs") => {
    updateExperienceCollection((jobsCollection) => [
      ...jobsCollection,
      { ...createEmptyJob(), hidden: getJobVisibility(collectionKey) },
    ]);
  };

  const removeJob = (collectionKey: JobCollectionKey, jobIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const sourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (sourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.filter((_, index) => index !== sourceIndex);
    });
  };

  const moveJob = (jobIndex: number, direction: Direction) => {
    updateExperienceCollection((jobsCollection) => {
      const visibleIndices = jobsCollection.reduce<number[]>((result, job, sourceIndex) => {
        if (!job.hidden) {
          result.push(sourceIndex);
        }

        return result;
      }, []);
      const nextIndex = direction === "up" ? jobIndex - 1 : jobIndex + 1;

      if (nextIndex < 0 || nextIndex >= visibleIndices.length) {
        return jobsCollection;
      }

      const currentSourceIndex = visibleIndices[jobIndex];
      const nextSourceIndex = visibleIndices[nextIndex];
      const nextJobs = [...jobsCollection];
      [nextJobs[currentSourceIndex], nextJobs[nextSourceIndex]] = [
        nextJobs[nextSourceIndex],
        nextJobs[currentSourceIndex],
      ];

      return nextJobs;
    });
  };

  const reorderJobs = (collectionKey: JobCollectionKey, fromIndex: number, toIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const targetHidden = getJobVisibility(collectionKey);
      const filteredJobs = jobsCollection.filter(
        (job) => Boolean(job.hidden) === targetHidden
      );

      if (fromIndex === toIndex) {
        return jobsCollection;
      }

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= filteredJobs.length ||
        toIndex >= filteredJobs.length
      ) {
        return jobsCollection;
      }

      const reorderedJobs = [...filteredJobs];
      const [movedJob] = reorderedJobs.splice(fromIndex, 1);

      if (!movedJob) {
        return jobsCollection;
      }

      reorderedJobs.splice(toIndex, 0, movedJob);

      let filteredCursor = 0;
      return jobsCollection.map((job) => {
        if (Boolean(job.hidden) !== targetHidden) {
          return job;
        }

        const nextJob = reorderedJobs[filteredCursor];
        filteredCursor += 1;
        return nextJob ?? job;
      });
    });
  };

  const hideJob = (jobIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const sourceIndex = findJobSourceIndex(jobsCollection, "jobs", jobIndex);

      if (sourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) =>
        index === sourceIndex ? { ...job, hidden: true } : job
      );
    });
  };

  const restoreHiddenJob = (jobIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const sourceIndex = findJobSourceIndex(jobsCollection, "_commentedJobs", jobIndex);

      if (sourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) =>
        index === sourceIndex ? { ...job, hidden: false } : job
      );
    });
  };

  const hideTask = (collectionKey: JobCollectionKey, jobIndex: number, taskIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) => {
        if (index !== jobSourceIndex) {
          return job;
        }

        const taskSourceIndex = findTaskSourceIndex(job.tasks, "tasks", taskIndex);

        if (taskSourceIndex === -1) {
          return job;
        }

        return {
          ...job,
          tasks: job.tasks.map((task, currentTaskIndex) =>
            currentTaskIndex === taskSourceIndex ? { ...task, hidden: true } : task
          ),
        };
      });
    });
  };

  const restoreHiddenTask = (collectionKey: JobCollectionKey, jobIndex: number, taskIndex: number) => {
    updateExperienceCollection((jobsCollection) => {
      const jobSourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (jobSourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) => {
        if (index !== jobSourceIndex) {
          return job;
        }

        const taskSourceIndex = findTaskSourceIndex(job.tasks, "_commentedTasks", taskIndex);

        if (taskSourceIndex === -1) {
          return job;
        }

        return {
          ...job,
          tasks: job.tasks.map((task, currentTaskIndex) =>
            currentTaskIndex === taskSourceIndex ? { ...task, hidden: false } : task
          ),
        };
      });
    });
  };

  const updateJobNotes = (collectionKey: JobCollectionKey, jobIndex: number, value: string) => {
    updateExperienceCollection((jobsCollection) => {
      const sourceIndex = findJobSourceIndex(jobsCollection, collectionKey, jobIndex);

      if (sourceIndex === -1) {
        return jobsCollection;
      }

      return jobsCollection.map((job, index) =>
        index === sourceIndex ? { ...job, notes: value } : job
      );
    });
  };

  const updateEducationCollection = (
    collectionKey: EducationCollectionKey,
    updater: (entries: CourseEntry[]) => CourseEntry[]
  ) => {
    updateActiveResume((current) => {
      const collection = current.sections.education[collectionKey] ?? [];

      return {
        ...current,
        sections: {
          ...current.sections,
          education: {
            ...current.sections.education,
            [collectionKey]: updater(collection),
          },
        },
      };
    });
  };

  const updateEducationEntry = (collectionKey: EducationCollectionKey, entryIndex: number, value: string) => {
    updateEducationCollection(collectionKey, (entries) =>
      entries.map((entry, index) => (index === entryIndex ? { ...entry, course: value } : entry))
    );
  };

  const addEducationEntry = (collectionKey: EducationCollectionKey = "entries") => {
    updateEducationCollection(collectionKey, (entries) => [...entries, createEmptyCourseEntry()]);
  };

  const removeEducationEntry = (collectionKey: EducationCollectionKey, entryIndex: number) => {
    updateEducationCollection(collectionKey, (entries) =>
      entries.filter((_, index) => index !== entryIndex)
    );
  };

  const moveEducationEntry = (entryIndex: number, direction: Direction) => {
    updateEducationCollection("entries", (entries) => moveItem(entries, entryIndex, direction));
  };

  const reorderEducationEntry = (
    collectionKey: EducationCollectionKey,
    fromIndex: number,
    toIndex: number
  ) => {
    updateEducationCollection(collectionKey, (entries) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= entries.length ||
        toIndex >= entries.length
      ) {
        return entries;
      }

      const nextEntries = [...entries];
      const [movedEntry] = nextEntries.splice(fromIndex, 1);

      if (!movedEntry) {
        return entries;
      }

      nextEntries.splice(toIndex, 0, movedEntry);
      return nextEntries;
    });
  };

  const hideEducationEntry = (entryIndex: number) => {
    updateActiveResume((current) => {
      const entries = [...current.sections.education.entries];
      const hiddenEntries = [...(current.sections.education._commentedEntries ?? [])];
      const [entryToHide] = entries.splice(entryIndex, 1);

      if (!entryToHide) {
        return current;
      }

      hiddenEntries.push(entryToHide);

      return {
        ...current,
        sections: {
          ...current.sections,
          education: {
            ...current.sections.education,
            entries,
            _commentedEntries: hiddenEntries,
          },
        },
      };
    });
  };

  const restoreEducationEntry = (entryIndex: number) => {
    updateActiveResume((current) => {
      const entries = [...current.sections.education.entries];
      const hiddenEntries = [...(current.sections.education._commentedEntries ?? [])];
      const [entryToRestore] = hiddenEntries.splice(entryIndex, 1);

      if (!entryToRestore) {
        return current;
      }

      entries.push(entryToRestore);

      return {
        ...current,
        sections: {
          ...current.sections,
          education: {
            ...current.sections.education,
            entries,
            _commentedEntries: hiddenEntries,
          },
        },
      };
    });
  };

  const updateLanguageItem = (languageIndex: number, field: "name" | "level", value: string) => {
    updateActiveResume((current) => {
      const items = current.sections.languages.items?.map((item, index) =>
        index === languageIndex ? { ...item, [field]: value } : item
      ) ?? [createEmptyLanguageItem()];

      return {
        ...current,
        sections: {
          ...current.sections,
          languages: {
            ...current.sections.languages,
            items,
            content: joinLanguageItems(items),
          },
        },
      };
    });
  };

  const addLanguageItem = () => {
    updateActiveResume((current) => {
      const nextItems = [...(current.sections.languages.items ?? []), createEmptyLanguageItem()];

      return {
        ...current,
        sections: {
          ...current.sections,
          languages: {
            ...current.sections.languages,
            items: nextItems,
            content: joinLanguageItems(nextItems),
          },
        },
      };
    });
  };

  const removeLanguageItem = (languageIndex: number) => {
    updateActiveResume((current) => {
      const nextItems = (current.sections.languages.items ?? []).filter(
        (_, index) => index !== languageIndex
      );
      const normalizedItems = nextItems.length ? nextItems : [createEmptyLanguageItem()];

      return {
        ...current,
        sections: {
          ...current.sections,
          languages: {
            ...current.sections.languages,
            items: normalizedItems,
            content: joinLanguageItems(normalizedItems),
          },
        },
      };
    });
  };

  const reorderLanguageItems = (fromIndex: number, toIndex: number) => {
    updateActiveResume((current) => {
      const items = current.sections.languages.items ?? [createEmptyLanguageItem()];

      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= items.length ||
        toIndex >= items.length
      ) {
        return current;
      }

      const nextItems = [...items];
      const [movedItem] = nextItems.splice(fromIndex, 1);

      if (!movedItem) {
        return current;
      }

      nextItems.splice(toIndex, 0, movedItem);

      return {
        ...current,
        sections: {
          ...current.sections,
          languages: {
            ...current.sections.languages,
            items: nextItems,
            content: joinLanguageItems(nextItems),
          },
        },
      };
    });
  };

  const updateCertificatesCollection = (
    updater: (items: CourseEntry[]) => CourseEntry[]
  ) => {
    updateActiveResume((current) => {
      const collection = current.sections.certificates.items ?? [];

      return {
        ...current,
        sections: {
          ...current.sections,
          certificates: {
            ...current.sections.certificates,
            items: updater(collection),
          },
        },
      };
    });
  };

  const updateCertificateEntry = (
    collectionKey: CertificatesCollectionKey,
    entryIndex: number,
    value: string
  ) => {
    updateCertificatesCollection((items) => {
      const sourceIndex = findCertificateSourceIndex(items, collectionKey, entryIndex);

      if (sourceIndex === -1) {
        return items;
      }

      return items.map((item, index) =>
        index === sourceIndex ? { ...item, course: value } : item
      );
    });
  };

  const addCertificateEntry = (collectionKey: CertificatesCollectionKey = "items") => {
    updateCertificatesCollection((items) => [
      ...items,
      { ...createEmptyCourseEntry(), hidden: getCertificateVisibility(collectionKey) },
    ]);
  };

  const removeCertificateEntry = (collectionKey: CertificatesCollectionKey, entryIndex: number) => {
    updateCertificatesCollection((items) => {
      const sourceIndex = findCertificateSourceIndex(items, collectionKey, entryIndex);

      if (sourceIndex === -1) {
        return items;
      }

      return items.filter((_, index) => index !== sourceIndex);
    });
  };

  const moveCertificateEntry = (entryIndex: number, direction: Direction) => {
    updateCertificatesCollection((items) => {
      const visibleIndices = items.reduce<number[]>((result, item, sourceIndex) => {
        if (!item.hidden) {
          result.push(sourceIndex);
        }

        return result;
      }, []);
      const nextIndex = direction === "up" ? entryIndex - 1 : entryIndex + 1;

      if (nextIndex < 0 || nextIndex >= visibleIndices.length) {
        return items;
      }

      const currentSourceIndex = visibleIndices[entryIndex];
      const nextSourceIndex = visibleIndices[nextIndex];
      const nextItems = [...items];
      [nextItems[currentSourceIndex], nextItems[nextSourceIndex]] = [
        nextItems[nextSourceIndex],
        nextItems[currentSourceIndex],
      ];

      return nextItems;
    });
  };

  const reorderCertificateEntry = (
    collectionKey: CertificatesCollectionKey,
    fromIndex: number,
    toIndex: number
  ) => {
    updateCertificatesCollection((items) => {
      const targetHidden = getCertificateVisibility(collectionKey);
      const filteredItems = items.filter((item) => Boolean(item.hidden) === targetHidden);

      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= filteredItems.length ||
        toIndex >= filteredItems.length
      ) {
        return items;
      }

      const reorderedItems = [...filteredItems];
      const [movedItem] = reorderedItems.splice(fromIndex, 1);

      if (!movedItem) {
        return items;
      }

      reorderedItems.splice(toIndex, 0, movedItem);

      let filteredCursor = 0;
      return items.map((item) => {
        if (Boolean(item.hidden) !== targetHidden) {
          return item;
        }

        const nextItem = reorderedItems[filteredCursor];
        filteredCursor += 1;
        return nextItem ?? item;
      });
    });
  };

  const hideCertificateEntry = (entryIndex: number) => {
    updateCertificatesCollection((items) => {
      const sourceIndex = findCertificateSourceIndex(items, "items", entryIndex);

      if (sourceIndex === -1) {
        return items;
      }

      return items.map((item, index) =>
        index === sourceIndex ? { ...item, hidden: true } : item
      );
    });
  };

  const restoreCertificateEntry = (entryIndex: number) => {
    updateCertificatesCollection((items) => {
      const sourceIndex = findCertificateSourceIndex(items, "_commentedItems", entryIndex);

      if (sourceIndex === -1) {
        return items;
      }

      return items.map((item, index) =>
        index === sourceIndex ? { ...item, hidden: false } : item
      );
    });
  };

  const updateSkillItem = (index: number, value: string) => {
    setSkills((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (itemIndex === index ? value : item)),
    }));
  };

  const addSkillItem = () => {
    setSkills((current) => ({
      ...current,
      items: [...current.items, ""],
    }));
  };

  const removeSkillItem = (index: number) => {
    setSkills((current) => {
      if (current.items.length <= 1) {
        return {
          ...current,
          items: [""],
        };
      }

      const nextItems = current.items.filter((_, itemIndex) => itemIndex !== index);

      return {
        ...current,
        items: nextItems.length ? nextItems : [""],
      };
    });
  };

  const updateSkillColumns = (value: number) => {
    setSkills((current) => {
      if (value < 3 || value > 6) {
        return current;
      }

      return {
        ...current,
        columns: value,
      };
    });
  };

  const importResume = async (language: ResumeLanguageCode, file: File) => {
    try {
      const parsed = await readJsonFile<ResumeData>(file);
      updateResume(language, () => normalizeResume(parsed));
      setStatus(
        t.loadedInto(file.name, getResumeLanguageLabel(language, uiLanguage, resumeLanguageLabels))
      );
    } catch (error) {
      setStatus(t.failedImport(file.name, error instanceof Error ? error.message : t.unknownError));
    }
  };

  const importSkills = async (file: File) => {
    try {
      const parsed = await readJsonFile<SkillsData>(file);
      setSkills(normalizeSkills(parsed));
      setStatus(t.loaded(file.name));
    } catch (error) {
      setStatus(t.failedImport(file.name, error instanceof Error ? error.message : t.unknownError));
    }
  };

  const exportJson = (filename: string, data: ResumeData | SkillsData) => {
    downloadBlob(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
      filename
    );
    setStatus(t.downloaded(filename));
  };

  const openImportPicker = (target: ImportTarget) => {
    setPendingImportTarget(target);
    setModalType(null);
    importInputRef.current?.click();
  };

  const handleImportFile = async (file: File | null) => {
    if (!file || !pendingImportTarget) {
      return;
    }

    const target = pendingImportTarget;
    setPendingImportTarget(null);

    if (target === "skills") {
      await importSkills(file);
      return;
    }

    await importResume(target, file);
  };

  const handleExportSelection = (target: ImportTarget) => {
    if (target === "skills") {
      exportJson("skills.json", skills);
    } else {
      exportJson(`${target}.json`, resumes[target]);
    }

    setModalType(null);
  };

  const resetToExamples = () => {
    if (!window.confirm(t.resetConfirm)) {
      return;
    }

    const defaults = getDefaultState();
    setResumes(defaults.resumes);
    setSkills(defaults.skills);
    setPdfFileNames(defaults.pdfFileNames);
    setResumeLanguageLabels(defaults.resumeLanguageLabels);
    setActiveLanguage("ru");
    setStatus(t.resetDone);
  };

  const openCreateResumeLanguageModal = () => {
    setNewResumeLanguageName("");
    setIsCreateResumeLanguageModalOpen(true);
  };

  const closeCreateResumeLanguageModal = () => {
    setNewResumeLanguageName("");
    setIsCreateResumeLanguageModalOpen(false);
  };

  const addResumeLanguage = () => {
    const nextLabel = newResumeLanguageName.trim();

    if (!nextLabel) {
      return;
    }

    if (hasResumeLanguageLabelCollision(nextLabel)) {
      setStatus(t.resumeLanguageExists(nextLabel));
      return;
    }

    const nextLanguageCode = Object.keys(resumes).includes(uiLanguage)
      ? createResumeLanguageCode(nextLabel, Object.keys(resumes))
      : uiLanguage;
    const nextResume = clone(getDefaultResumeForLanguage(uiLanguage));

    setResumes((current) => ({
      ...current,
      [nextLanguageCode]: nextResume,
    }));
    setPdfFileNames((current) => ({
      ...current,
      [nextLanguageCode]: getDefaultPdfFileName(nextLanguageCode),
    }));
    setResumeLanguageLabels((current) => ({
      ...current,
      [nextLanguageCode]: nextLabel,
    }));
    setActiveLanguage(nextLanguageCode);
    setIsCreateResumeLanguageModalOpen(false);
    setNewResumeLanguageName("");
    setStatus(t.resumeLanguageAdded(nextLabel));
  };

  const openDuplicateResumeLanguageModal = (languageToDuplicate: ResumeLanguageCode) => {
    const sourceLabel = getResumeLanguageLabel(
      languageToDuplicate,
      uiLanguage,
      resumeLanguageLabels
    );
    setDuplicateResumeLanguageName(t.duplicateResumeLanguageDefaultName(sourceLabel));
    setPendingResumeLanguageDuplicate(languageToDuplicate);
  };

  const closeDuplicateResumeLanguageModal = () => {
    setDuplicateResumeLanguageName("");
    setPendingResumeLanguageDuplicate(null);
  };

  const duplicateResumeLanguage = () => {
    const sourceLanguage = pendingResumeLanguageDuplicate;
    const nextLabel = duplicateResumeLanguageName.trim();

    if (!sourceLanguage || !nextLabel) {
      return;
    }

    if (hasResumeLanguageLabelCollision(nextLabel)) {
      setStatus(t.resumeLanguageExists(nextLabel));
      return;
    }

    const nextLanguageCode = createResumeLanguageCode(nextLabel, Object.keys(resumes));
    const nextResume = clone(resumes[sourceLanguage]);

    setResumes((current) => ({
      ...current,
      [nextLanguageCode]: nextResume,
    }));
    setPdfFileNames((current) => ({
      ...current,
      [nextLanguageCode]: getDefaultPdfFileName(nextLanguageCode),
    }));
    setResumeLanguageLabels((current) => ({
      ...current,
      [nextLanguageCode]: nextLabel,
    }));
    setActiveLanguage(nextLanguageCode);
    setDuplicateResumeLanguageName("");
    setPendingResumeLanguageDuplicate(null);
    setStatus(t.resumeLanguageDuplicated(nextLabel));
  };

  const openRenameResumeLanguageModal = (languageToRename: ResumeLanguageCode) => {
    setRenameResumeLanguageName(
      getResumeLanguageLabel(languageToRename, uiLanguage, resumeLanguageLabels)
    );
    setPendingResumeLanguageRename(languageToRename);
  };

  const closeRenameResumeLanguageModal = () => {
    setRenameResumeLanguageName("");
    setPendingResumeLanguageRename(null);
  };

  const renameResumeLanguage = () => {
    const languageToRename = pendingResumeLanguageRename;
    const nextLabel = renameResumeLanguageName.trim();

    if (!languageToRename || !nextLabel) {
      return;
    }

    if (hasResumeLanguageLabelCollision(nextLabel, languageToRename)) {
      setStatus(t.resumeLanguageExists(nextLabel));
      return;
    }

    setResumeLanguageLabels((current) => ({
      ...current,
      [languageToRename]: nextLabel,
    }));
    setPendingResumeLanguageRename(null);
    setRenameResumeLanguageName("");
    setStatus(t.resumeLanguageRenamed(nextLabel));
  };

  const requestDeleteResumeLanguage = (languageToDelete: ResumeLanguageCode) => {
    setPendingResumeLanguageDeletion(languageToDelete);
  };

  const closeDeleteResumeLanguageModal = () => {
    setPendingResumeLanguageDeletion(null);
  };

  const confirmDeleteResumeLanguage = () => {
    const languageToDelete = pendingResumeLanguageDeletion;

    if (!languageToDelete) {
      return;
    }

    const languageCodes = Object.keys(resumes);

    if (languageCodes.length <= 1) {
      setStatus(t.cannotDeleteLastResumeLanguage);
      setPendingResumeLanguageDeletion(null);
      return;
    }

    const labelToDelete = getResumeLanguageLabel(
      languageToDelete,
      uiLanguage,
      resumeLanguageLabels
    );

    const nextLanguageCode =
      languageCodes.find((language) => language !== languageToDelete) ?? "ru";

    setResumes((current) => {
      const { [languageToDelete]: _removed, ...nextResumes } = current;
      return nextResumes;
    });
    setPdfFileNames((current) => {
      const { [languageToDelete]: _removed, ...nextFileNames } = current;
      return nextFileNames;
    });
    setResumeLanguageLabels((current) => {
      const { [languageToDelete]: _removed, ...nextLabels } = current;
      return nextLabels;
    });

    if (activeLanguage === languageToDelete) {
      setActiveLanguage(nextLanguageCode);
    }

    setPendingResumeLanguageDeletion(null);
    setStatus(t.resumeLanguageDeleted(labelToDelete));
  };

  const downloadPdf = async () => {
    setIsGenerating(true);

    try {
      const fontResponse = await fetch(fontUrl);
      const fontBytes = await fontResponse.arrayBuffer();
      const bytes = await createResumePdf({
        resumeData: resume,
        skillsData: skills,
        fontBytes,
      });
      const resolvedFileName = ensurePdfFileName(pdfFileName, activeLanguage, resume);
      const pdfBuffer =
        bytes.buffer instanceof ArrayBuffer
          ? bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
          : Uint8Array.from(bytes).buffer;

      setPdfFileNames((current) => ({
        ...current,
        [activeLanguage]: resolvedFileName,
      }));

      downloadBlob(
        new Blob([pdfBuffer], { type: "application/pdf" }),
        resolvedFileName
      );
      setStatus(t.pdfDownloaded(resolvedFileName));
    } catch (error) {
      setStatus(t.pdfFailed(error instanceof Error ? error.message : t.unknownError));
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    t,
    uiLanguage,
    setUiLanguage,
    theme,
    toggleTheme,
    activeLanguage,
    setActiveLanguage,
    resumes,
    resume,
    defaultResume,
    jobs,
    skills,
    defaultSkills,
    status,
    isGenerating,
    pdfFileName,
    activeResumeLanguageLabel,
    modalType,
    setModalType,
    isCreateResumeLanguageModalOpen,
    openCreateResumeLanguageModal,
    closeCreateResumeLanguageModal,
    newResumeLanguageName,
    setNewResumeLanguageName,
    addResumeLanguage,
    pendingResumeLanguageDuplicate,
    duplicateResumeLanguageName,
    setDuplicateResumeLanguageName,
    openDuplicateResumeLanguageModal,
    closeDuplicateResumeLanguageModal,
    duplicateResumeLanguage,
    pendingResumeLanguageRename,
    renameResumeLanguageName,
    setRenameResumeLanguageName,
    openRenameResumeLanguageModal,
    closeRenameResumeLanguageModal,
    renameResumeLanguage,
    pendingResumeLanguageDeletion,
    requestDeleteResumeLanguage,
    closeDeleteResumeLanguageModal,
    confirmDeleteResumeLanguage,
    didAutoSave,
    importInputRef,
    contactItems,
    totalContacts,
    hiddenJobs,
    totalEducation,
    hiddenEducationEntries,
    hiddenCertificateEntries,
    certificates,
    certificateEntries,
    languageItems,
    totalCertificates,
    totalLanguages,
    languageLevelOptions,
    interfaceLanguageOptions,
    resumeProgressItems,
    totalSkills,
    updateHeader,
    updateSummary,
    updatePdfFileName,
    updateSectionTitle,
    updateContactItem,
    addContactItem,
    removeContactItem,
    reorderContactItems,
    updateJobField,
    updateTask,
    addTask,
    removeTask,
    reorderTask,
    addJob,
    removeJob,
    moveJob,
    reorderJobs,
    hideJob,
    restoreHiddenJob,
    hideTask,
    restoreHiddenTask,
    updateJobNotes,
    updateEducationEntry,
    addEducationEntry,
    removeEducationEntry,
    moveEducationEntry,
    reorderEducationEntry,
    hideEducationEntry,
    restoreEducationEntry,
    updateLanguageItem,
    addLanguageItem,
    removeLanguageItem,
    reorderLanguageItems,
    updateCertificateEntry,
    addCertificateEntry,
    removeCertificateEntry,
    moveCertificateEntry,
    reorderCertificateEntry,
    hideCertificateEntry,
    restoreCertificateEntry,
    updateSkillItem,
    addSkillItem,
    removeSkillItem,
    updateSkillColumns,
    handleImportFile,
    handleExportSelection,
    openImportPicker,
    resetToExamples,
    downloadPdf,
  };
}

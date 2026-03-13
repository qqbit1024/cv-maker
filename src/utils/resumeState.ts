import deExample from "../../de.example.json";
import enExample from "../../en.example.json";
import esExample from "../../es.example.json";
import frExample from "../../fr.example.json";
import itExample from "../../it.example.json";
import plExample from "../../pl.example.json";
import ptExample from "../../pt.example.json";
import ruExample from "../../ru.example.json";
import srExample from "../../sr.example.json";
import ukExample from "../../uk.example.json";
import skillsExample from "../../skills.example.json";
import { slugifyFileName } from "./files";
import type {
  BuiltInResumeLanguageCode,
  CourseEntry,
  Direction,
  InterfaceLanguageCode,
  Job,
  JobTask,
  LanguageItem,
  ResumeData,
  ResumeProgressItem,
  ResumeLanguageCode,
  ResumeTemplateId,
  ResumeStudioState,
  SkillsData,
} from "../types/resume";

export const STORAGE_KEY = "resume-studio-state-v1";
export const BUILT_IN_RESUME_LANGUAGES: BuiltInResumeLanguageCode[] = ["ru", "en"];
export const DEFAULT_TEMPLATE_ID: ResumeTemplateId = "classic";

type MaybeRecord = Record<string, unknown>;

export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function interleaveSkillColumns(columns: string[][]): string[] {
  const result: string[] = [];
  const maxRows = Math.max(...columns.map((column) => column.length), 0);

  for (let rowIndex = 0; rowIndex < maxRows; rowIndex += 1) {
    columns.forEach((column) => {
      const nextValue = String(column[rowIndex] ?? "");

      if (nextValue) {
        result.push(nextValue);
      }
    });
  }

  return result;
}

export function isBuiltInResumeLanguage(
  language: string
): language is BuiltInResumeLanguageCode {
  return BUILT_IN_RESUME_LANGUAGES.includes(language as BuiltInResumeLanguageCode);
}

export function normalizeResumeLanguageCode(value: unknown): string {
  return (
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^\p{Letter}\p{Number}_-]+/gu, "")
      .replace(/^_+|_+$/g, "") || ""
  );
}

export function createResumeLanguageCode(
  label: string,
  existingCodes: string[]
): ResumeLanguageCode {
  const normalizedBase =
    normalizeResumeLanguageCode(label) || `lang_${existingCodes.length + 1}`;

  let nextCode = normalizedBase;
  let suffix = 2;

  while (existingCodes.includes(nextCode)) {
    nextCode = `${normalizedBase}_${suffix}`;
    suffix += 1;
  }

  return nextCode;
}

export function splitContactLine(value: unknown): string[] {
  const items = String(value ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length ? items : [""];
}

export function joinContactItems(items: string[]): string {
  return items
    .map((item) => String(item ?? "").trim())
    .filter(Boolean)
    .join(" | ");
}

export function createEmptyJob(): Job {
  return {
    title: "",
    company: "",
    period: "",
    tasks: [createEmptyJobTask()],
    notes: "",
    hidden: false,
  };
}

export function createEmptyJobTask(hidden = false): JobTask {
  return {
    text: "",
    hidden,
  };
}

export function createEmptyCourseEntry(): CourseEntry {
  return { course: "", hidden: false };
}

export function createEmptyLanguageItem(): LanguageItem {
  return { name: "", level: "" };
}

export function parseLanguagesContent(value: unknown): LanguageItem[] {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separatorIndex = item.indexOf(":");

      if (separatorIndex === -1) {
        return {
          name: item,
          level: "",
        };
      }

      return {
        name: item.slice(0, separatorIndex).trim(),
        level: item.slice(separatorIndex + 1).trim(),
      };
    });
}

export function joinLanguageItems(items: LanguageItem[]): string {
  return items
    .map(({ name = "", level = "" }) => {
      const normalizedName = String(name).trim();
      const normalizedLevel = String(level).trim();

      if (normalizedName && normalizedLevel) {
        return `${normalizedName}: ${normalizedLevel}`;
      }

      return normalizedName || normalizedLevel;
    })
    .filter(Boolean)
    .join(", ");
}

export function normalizeCourseItem(item: unknown): CourseEntry {
  if (typeof item === "string") {
    return { course: item, hidden: false };
  }

  const source = (item ?? {}) as Partial<CourseEntry>;
  return {
    course: source.course ?? "",
    hidden: Boolean(source.hidden),
  };
}

export function normalizeJobTask(task: unknown): JobTask {
  if (typeof task === "string") {
    return {
      text: task,
      hidden: false,
    };
  }

  const source = (task ?? {}) as Partial<JobTask>;
  return {
    text: source.text ?? "",
    hidden: Boolean(source.hidden),
  };
}

export function normalizeJob(job: unknown): Job {
  const source = (job ?? {}) as Partial<Job> & { _commentedTasks?: unknown };
  const { _commentedTasks: rawLegacyNotes, ...restSource } = source;
  const normalizedNotes = Array.isArray(rawLegacyNotes)
    ? rawLegacyNotes.map((task) => String(task ?? "")).join("\n")
    : String(source.notes ?? "");

  return {
    ...createEmptyJob(),
    ...restSource,
    tasks:
      Array.isArray(source.tasks) && source.tasks.length
        ? source.tasks.map(normalizeJobTask)
        : [createEmptyJobTask()],
    notes: normalizedNotes,
    hidden: Boolean(source.hidden),
  };
}

export function normalizeSkills(skills: unknown): SkillsData {
  const source = (skills ?? {}) as Partial<SkillsData> & { list?: unknown };
  const normalizedItems = Array.isArray(source.items)
    ? source.items.map((item) => String(item ?? ""))
    : Array.isArray(source.list)
      ? interleaveSkillColumns(
          source.list.map((column) =>
            Array.isArray(column) ? column.map((item) => String(item ?? "")) : []
          )
        )
      : clone(skillsExample.items);
  const normalizedColumns = Number(source.columns);

  return {
    items: normalizedItems,
    columns:
      Number.isInteger(normalizedColumns) && normalizedColumns >= 3 && normalizedColumns <= 6
        ? normalizedColumns
        : skillsExample.columns,
  };
}

export function normalizeResumeTemplate(value: unknown): ResumeTemplateId {
  return value === "compact" || value === "minimal" ? value : DEFAULT_TEMPLATE_ID;
}

export function normalizeResume(resume: unknown): ResumeData {
  const source = clone((resume ?? {}) as ResumeData & {
    header?: MaybeRecord;
    sections?: MaybeRecord;
  });
  const header = (source.header ?? {}) as ResumeData["header"];
  const sections = (source.sections ?? {}) as ResumeData["sections"] & MaybeRecord;
  const { _commentedCertificates: rawLegacyCertificates, ...restSections } = sections;
  const experience = (sections.experience ?? {}) as ResumeData["sections"]["experience"] & {
    _commentedJobs?: unknown[];
  };
  const { _commentedJobs: rawLegacyHiddenJobs, ...restExperience } = experience;
  const education = (sections.education ?? {}) as ResumeData["sections"]["education"];
  const languages = (sections.languages ?? {}) as ResumeData["sections"]["languages"];
  const certificates = (sections.certificates ?? {}) as ResumeData["sections"]["certificates"];
  const legacyCertificates = (rawLegacyCertificates ??
    {}) as NonNullable<ResumeData["sections"]["_commentedCertificates"]>;
  const contactItems =
    Array.isArray(header.contacts) && header.contacts.length
      ? header.contacts.map((item) => String(item ?? ""))
      : splitContactLine(header.contact);
  const languageItems =
    Array.isArray(languages.items) && languages.items.length
      ? languages.items.map((item) => ({
          name: item?.name ?? "",
          level: item?.level ?? "",
        }))
      : parseLanguagesContent(languages.content);

  return {
    ...source,
    header: {
      ...header,
      name: header.name ?? "",
      title: header.title ?? "",
      contacts: contactItems,
      contact: joinContactItems(contactItems),
    },
    sections: {
      ...restSections,
      summary: {
        title: sections.summary?.title ?? "",
        content: sections.summary?.content ?? "",
      },
      education: {
        ...education,
        title: education.title ?? "",
        entries: Array.isArray(education.entries)
          ? education.entries.map(normalizeCourseItem)
          : [],
        _commentedEntries: Array.isArray(education._commentedEntries)
          ? education._commentedEntries.map(normalizeCourseItem)
          : [],
      },
      experience: {
        ...restExperience,
        title: experience.title ?? "",
        jobs: [
          ...(Array.isArray(experience.jobs)
            ? experience.jobs.map((job) => ({
                ...normalizeJob(job),
                hidden: Boolean((job as Partial<Job>)?.hidden),
              }))
            : []),
          ...(Array.isArray(rawLegacyHiddenJobs)
            ? rawLegacyHiddenJobs.map((job) => ({
                ...normalizeJob(job),
                hidden: true,
              }))
            : []),
        ],
      },
      languages: {
        ...languages,
        title: languages.title ?? "",
        items: languageItems.length ? languageItems : [createEmptyLanguageItem()],
        content: joinLanguageItems(languageItems),
      },
      skills: {
        title: sections.skills?.title ?? "",
      },
      certificates: {
        ...certificates,
        title: certificates.title ?? legacyCertificates?.title ?? "",
        items: Array.isArray(certificates.items)
          ? certificates.items.map(normalizeCourseItem)
          : [
              ...(Array.isArray(legacyCertificates?.items)
                ? legacyCertificates.items.map((item) => ({
                    ...normalizeCourseItem(item),
                    hidden: true,
                  }))
                : []),
              ...(Array.isArray(legacyCertificates?._commentedItems)
                ? legacyCertificates._commentedItems.map((item) => ({
                    ...normalizeCourseItem(item),
                    hidden: true,
                  }))
                : []),
            ],
      },
    },
  };
}

export function normalizeState(state?: Partial<ResumeStudioState>): ResumeStudioState {
  const sourceResumes = state?.resumes ?? {};
  const resumes = Object.entries(sourceResumes).reduce<Record<ResumeLanguageCode, ResumeData>>(
    (result, [language, resume]) => ({
      ...result,
      [language]: normalizeResume(resume),
    }),
    {
      ru: normalizeResume(sourceResumes.ru ?? ruExample),
      en: normalizeResume(sourceResumes.en ?? enExample),
    }
  );
  const resumeLanguageLabels = Object.keys(resumes).reduce<Record<ResumeLanguageCode, string>>(
    (result, language) => {
      const nextLabel = String(state?.resumeLanguageLabels?.[language] ?? "").trim();

      if (!nextLabel) {
        return result;
      }

      return {
        ...result,
        [language]: nextLabel,
      };
    },
    {}
  );
  const pdfFileNames = Object.keys(resumes).reduce<Record<ResumeLanguageCode, string>>(
    (result, language) => ({
      ...result,
      [language]: ensurePdfFileName(state?.pdfFileNames?.[language], language, resumes[language]),
    }),
    {}
  );
  const resumeTemplates = Object.keys(resumes).reduce<Record<ResumeLanguageCode, ResumeTemplateId>>(
    (result, language) => ({
      ...result,
      [language]: normalizeResumeTemplate(state?.resumeTemplates?.[language]),
    }),
    {}
  );

  return {
    resumes,
    skills: normalizeSkills(state?.skills ?? skillsExample),
    pdfFileNames,
    resumeLanguageLabels,
    resumeTemplates,
  };
}

export function getDefaultResumeForLanguage(language: ResumeLanguageCode): ResumeData {
  if (language === "ru") {
    return normalizeResume(ruExample);
  }

  if (language === "en") {
    return normalizeResume(enExample);
  }

  if (language === "de") {
    return normalizeResume(deExample);
  }

  if (language === "es") {
    return normalizeResume(esExample);
  }

  if (language === "fr") {
    return normalizeResume(frExample);
  }

  if (language === "it") {
    return normalizeResume(itExample);
  }

  if (language === "pl") {
    return normalizeResume(plExample);
  }

  if (language === "pt") {
    return normalizeResume(ptExample);
  }

  if (language === "sr") {
    return normalizeResume(srExample);
  }

  if (language === "uk") {
    return normalizeResume(ukExample);
  }

  return normalizeResume(ruExample);
}

export function getDefaultSkills(): SkillsData {
  return normalizeSkills(skillsExample);
}

export function getDefaultState(): ResumeStudioState {
  return normalizeState();
}

export function getDefaultPdfFileName(language: ResumeLanguageCode): string {
  const normalizedLanguage = normalizeResumeLanguageCode(language) || "lang";
  return `resume_${normalizedLanguage}.pdf`;
}

export function ensurePdfFileName(
  value: unknown,
  language: ResumeLanguageCode,
  resume?: ResumeData
): string {
  const normalizedValue = String(value ?? "").trim();
  const fallbackValue = getDefaultPdfFileName(language);
  const legacyValue =
    resume == null
      ? ""
      : `${slugifyFileName(resume.header.name || `resume_${language}`)}_${language}.pdf`;
  const fileName =
    !normalizedValue ||
    (legacyValue && normalizedValue.toLowerCase() === legacyValue.toLowerCase())
      ? fallbackValue
      : normalizedValue;

  return fileName.toLowerCase().endsWith(".pdf") ? fileName : `${fileName}.pdf`;
}

export function loadState(): ResumeStudioState {
  if (typeof window === "undefined") {
    return getDefaultState();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return getDefaultState();
  }

  try {
    return normalizeState(JSON.parse(raw) as ResumeStudioState);
  } catch {
    return getDefaultState();
  }
}

export function moveItem<T>(items: T[], index: number, direction: Direction): T[] {
  const nextIndex = direction === "up" ? index - 1 : index + 1;

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  [nextItems[index], nextItems[nextIndex]] = [nextItems[nextIndex], nextItems[index]];
  return nextItems;
}

function isFilled(value: unknown): boolean {
  return Boolean(String(value ?? "").trim());
}

function isCompletedValue(value: unknown, baselineValue: unknown): boolean {
  const normalizedValue = String(value ?? "").trim();
  const normalizedBaseline = String(baselineValue ?? "").trim();

  if (!normalizedValue) {
    return false;
  }

  if (normalizedValue === normalizedBaseline) {
    return false;
  }

  return true;
}

function collectCompletionValues(resume: ResumeData, skills: SkillsData): string[] {
  const summaryContent = Array.isArray(resume.sections.summary.content)
    ? resume.sections.summary.content.join(" ")
    : resume.sections.summary.content;
  const contacts =
    Array.isArray(resume.header.contacts) && resume.header.contacts.length
      ? resume.header.contacts
      : splitContactLine(resume.header.contact);
  const languageItems =
    Array.isArray(resume.sections.languages.items) && resume.sections.languages.items.length
      ? resume.sections.languages.items
      : parseLanguagesContent(resume.sections.languages.content);

  return [
    resume.header.name,
    resume.header.title,
    ...contacts,
    resume.sections.summary.title,
    summaryContent,
    resume.sections.experience.title,
    ...resume.sections.experience.jobs.flatMap((job) => [
      job.title,
      job.company,
      job.period,
      job.notes,
      ...job.tasks.map((task) => task.text),
    ]),
    resume.sections.education.title,
    ...resume.sections.education.entries.map((entry) => entry.course),
    resume.sections.certificates.title,
    ...resume.sections.certificates.items.map((item) => item.course),
    resume.sections.languages.title,
    ...languageItems.flatMap((item) => [item.name, item.level]),
    resume.sections.skills.title,
    ...skills.items,
  ];
}

export function getResumeCompletion(
  resume: ResumeData,
  skills: SkillsData,
  baselineResume: ResumeData,
  baselineSkills: SkillsData
): Omit<ResumeProgressItem, "language" | "label"> {
  const values = collectCompletionValues(resume, skills);
  const baselineValues = collectCompletionValues(baselineResume, baselineSkills);

  const total = values.length;
  const completed = values.filter(
    (value, index) => isFilled(value) && isCompletedValue(value, baselineValues[index])
  ).length;

  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
  };
}

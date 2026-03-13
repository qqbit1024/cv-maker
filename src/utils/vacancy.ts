import type { ResumeData, SkillsData, VacancyAnalysis, VacancyDraft } from "../types/resume";

const VACANCY_STORAGE_KEY = "resume-studio-vacancy-v1";

const KEYWORD_LIBRARY = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "react native",
  "node.js",
  "express",
  "koa",
  "fastapi",
  "graphql",
  "apollo",
  "rest api",
  "websocket",
  "postgresql",
  "mysql",
  "redis",
  "docker",
  "ci/cd",
  "oauth",
  "system design",
  "software architecture",
  "performance optimization",
  "mentoring",
  "code review",
  "ownership",
  "leadership",
  "frontend",
  "backend",
  "full-stack",
  "full stack",
  "mobile",
  "real-time",
  "analytics",
  "maps",
  "ai",
  "llm",
  "vite",
  "redux",
  "ssr",
];

const FALLBACK_STOP_WORDS = new Set([
  "and",
  "the",
  "for",
  "with",
  "that",
  "this",
  "from",
  "into",
  "your",
  "will",
  "about",
  "наш",
  "для",
  "или",
  "что",
  "как",
  "это",
  "with",
  "have",
  "has",
  "you",
  "work",
  "team",
  "опыт",
  "работы",
  "проект",
  "резюме",
  "кандидат",
]);

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function createEmptyVacancyDraft(): VacancyDraft {
  return {
    role: "",
    company: "",
    description: "",
    notes: "",
  };
}

export function loadVacancyDrafts(): Record<string, VacancyDraft> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(VACANCY_STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, Partial<VacancyDraft>>;
    return Object.entries(parsed).reduce<Record<string, VacancyDraft>>((result, [language, draft]) => {
      result[language] = {
        role: String(draft?.role ?? ""),
        company: String(draft?.company ?? ""),
        description: String(draft?.description ?? ""),
        notes: String(draft?.notes ?? ""),
      };
      return result;
    }, {});
  } catch {
    return {};
  }
}

export function saveVacancyDrafts(drafts: Record<string, VacancyDraft>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(VACANCY_STORAGE_KEY, JSON.stringify(drafts));
}

function collectResumeText(resume: ResumeData, skills: SkillsData) {
  const summaryContent = Array.isArray(resume.sections.summary.content)
    ? resume.sections.summary.content.join(" ")
    : resume.sections.summary.content;
  const contacts = Array.isArray(resume.header.contacts)
    ? resume.header.contacts.join(" ")
    : resume.header.contact;
  const languages = Array.isArray(resume.sections.languages.items)
    ? resume.sections.languages.items
        .flatMap((item) => [item.name, item.level])
        .filter(Boolean)
        .join(" ")
    : resume.sections.languages.content;

  return normalizeText(
    [
      resume.header.name,
      resume.header.title,
      contacts,
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
      languages,
      resume.sections.skills.title,
      ...skills.items,
    ]
      .join(" ")
      .replace(/\s+/g, " ")
  );
}

function extractFallbackKeywords(text: string) {
  const words = normalizeText(text)
    .split(/[^a-zа-я0-9.+#/-]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length >= 4 && !FALLBACK_STOP_WORDS.has(word));

  const frequency = new Map<string, number>();
  words.forEach((word) => frequency.set(word, (frequency.get(word) ?? 0) + 1));

  return [...frequency.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 12)
    .map(([word]) => word);
}

export function analyzeVacancy(
  draft: VacancyDraft,
  resume: ResumeData,
  skills: SkillsData
): VacancyAnalysis {
  const vacancyText = normalizeText(
    [draft.role, draft.company, draft.description, draft.notes].filter(Boolean).join(" ")
  );

  if (!vacancyText) {
    return {
      score: 0,
      extractedKeywords: [],
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: [],
    };
  }

  const resumeText = collectResumeText(resume, skills);
  const keywordMatches = [
    ...KEYWORD_LIBRARY.filter((keyword) => vacancyText.includes(normalizeText(keyword))),
    ...skills.items.filter((skill) => vacancyText.includes(normalizeText(skill))),
  ];
  const extractedKeywords = [...new Set(keywordMatches.map((item) => item.trim()).filter(Boolean))];
  const normalizedKeywords = extractedKeywords.length ? extractedKeywords : extractFallbackKeywords(vacancyText);
  const matchedKeywords = normalizedKeywords.filter((keyword) =>
    resumeText.includes(normalizeText(keyword))
  );
  const missingKeywords = normalizedKeywords.filter(
    (keyword) => !resumeText.includes(normalizeText(keyword))
  );

  const suggestions: string[] = [];

  if (missingKeywords.some((keyword) => KEYWORD_LIBRARY.includes(keyword))) {
    suggestions.push("Strengthen the summary, skills, or experience bullets with the missing stack keywords.");
  }

  if (missingKeywords.some((keyword) => ["mentoring", "code review", "leadership", "ownership"].includes(keyword))) {
    suggestions.push("Add leadership signals such as mentoring, ownership, or architecture decisions.");
  }

  if (missingKeywords.some((keyword) => ["performance optimization", "system design", "software architecture"].includes(keyword))) {
    suggestions.push("Show technical depth with performance, architecture, or scale-related achievements.");
  }

  if (!suggestions.length && normalizedKeywords.length) {
    suggestions.push("Coverage looks strong. Tailor one or two bullets to mirror the vacancy wording more closely.");
  }

  const score = normalizedKeywords.length
    ? Math.round((matchedKeywords.length / normalizedKeywords.length) * 100)
    : 0;

  return {
    score,
    extractedKeywords: normalizedKeywords,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}

import type { UIText } from "../i18n/uiText";
import type { ResumeData, ResumeQualityAnalysis, SkillsData } from "../types/resume";

const METRIC_PATTERN = /\b\d+(?:[.,]\d+)?\s?(?:%|x|ms|s|sec|seconds?|mins?|minutes?|hours?|k|m|млн|тыс)?\b/i;
const STRONG_ENGLISH_LEVELS = new Set(["native", "nativo", "natif", "muttersprache", "ojczysty", "рідна", "родной", "матерњи", "b2", "c1", "c2"]);
const ENGLISH_ALIASES = ["english", "английский", "англійська", "inglés", "inglese", "anglais", "englisch", "engleski"];

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function hasMetric(text: string): boolean {
  return METRIC_PATTERN.test(text);
}

function isEnglishLanguage(name: string): boolean {
  const normalizedName = name.trim().toLowerCase();
  return ENGLISH_ALIASES.includes(normalizedName);
}

export function analyzeResumeQuality(
  resume: ResumeData,
  skills: SkillsData,
  t: UIText,
  completionPercent = 100
): ResumeQualityAnalysis {
  const issues: ResumeQualityAnalysis["issues"] = [];
  const suggestions = new Set<string>();
  let totalChecks = 8;

  const role = normalizeText(resume.header.title);
  const contacts = (resume.header.contacts ?? []).map(normalizeText).filter(Boolean);
  const summaryText = Array.isArray(resume.sections.summary.content)
    ? resume.sections.summary.content.join(" ")
    : normalizeText(resume.sections.summary.content);
  const summaryWordCount = summaryText.split(/\s+/).filter(Boolean).length;
  const visibleJobs = (resume.sections.experience.jobs ?? []).filter((job) => !job.hidden);
  const visibleSkills = (skills.items ?? []).map(normalizeText).filter(Boolean);
  const languageItems = resume.sections.languages.items ?? [];
  const allBullets = visibleJobs.flatMap((job) =>
    (job.tasks ?? []).filter((task) => !task.hidden).map((task) => normalizeText(task.text)).filter(Boolean)
  );
  const hasAnyMetric = allBullets.some(hasMetric);
  const englishItem = languageItems.find((item) => isEnglishLanguage(normalizeText(item.name)));
  const englishLevel = normalizeText(englishItem?.level).toLowerCase();
  const hasStrongEnglish = STRONG_ENGLISH_LEVELS.has(englishLevel);
  const draftChecklist = [
    t.qualityDraftHintRole,
    t.qualityDraftHintSummary,
    t.qualityDraftHintExperience,
    t.qualityDraftHintSkills,
  ];
  const isDraft = completionPercent < 25;

  if (isDraft) {
    return {
      isDraft: true,
      score: 0,
      strongCount: 0,
      needsAttentionCount: draftChecklist.length,
      issues: [],
      suggestions: [],
      draftChecklist,
    };
  }

  if (!role) {
    issues.push({
      id: "missing-role",
      title: t.qualityIssueMissingRoleTitle,
      description: t.qualityIssueMissingRoleDescription,
      severity: "error",
      section: t.header,
    });
  }

  if (contacts.length < 3) {
    issues.push({
      id: "few-contacts",
      title: t.qualityIssueFewContactsTitle,
      description: t.qualityIssueFewContactsDescription,
      severity: "warning",
      section: t.header,
    });
  }

  if (summaryWordCount < 18) {
    issues.push({
      id: "summary-short",
      title: t.qualityIssueSummaryShortTitle,
      description: t.qualityIssueSummaryShortDescription,
      severity: "warning",
      section: t.summary,
    });
    suggestions.add(t.qualitySuggestionSummary);
  } else if (summaryWordCount > 85) {
    issues.push({
      id: "summary-long",
      title: t.qualityIssueSummaryLongTitle,
      description: t.qualityIssueSummaryLongDescription,
      severity: "warning",
      section: t.summary,
    });
    suggestions.add(t.qualitySuggestionSummary);
  }

  if (visibleJobs.length < 2) {
    issues.push({
      id: "few-jobs",
      title: t.qualityIssueFewJobsTitle,
      description: t.qualityIssueFewJobsDescription,
      severity: "warning",
      section: t.experience,
    });
  }

  visibleJobs.forEach((job) => {
    totalChecks += 1;
    const visibleTasks = (job.tasks ?? []).filter((task) => !task.hidden && normalizeText(task.text));

    if (visibleTasks.length < 3) {
      issues.push({
        id: `job-bullets-${job.company || job.title}`,
        title: t.qualityIssueJobBulletsTitle(normalizeText(job.company)),
        description: t.qualityIssueJobBulletsDescription,
        severity: "warning",
        section: t.experience,
      });
      suggestions.add(t.qualitySuggestionBullets);
    }
  });

  if (!hasAnyMetric) {
    issues.push({
      id: "missing-metrics",
      title: t.qualityIssueMissingMetricsTitle,
      description: t.qualityIssueMissingMetricsDescription,
      severity: "warning",
      section: t.experience,
    });
    suggestions.add(t.qualitySuggestionMetrics);
  }

  if (visibleSkills.length < 10) {
    issues.push({
      id: "skills-low",
      title: t.qualityIssueSkillsLowTitle,
      description: t.qualityIssueSkillsLowDescription,
      severity: "warning",
      section: t.skills,
    });
    suggestions.add(t.qualitySuggestionSkills);
  } else if (visibleSkills.length > 32) {
    issues.push({
      id: "skills-overload",
      title: t.qualityIssueSkillsOverloadTitle,
      description: t.qualityIssueSkillsOverloadDescription,
      severity: "warning",
      section: t.skills,
    });
    suggestions.add(t.qualitySuggestionSkills);
  }

  if (!hasStrongEnglish) {
    issues.push({
      id: "english-level",
      title: t.qualityIssueEnglishTitle,
      description: t.qualityIssueEnglishDescription,
      severity: "warning",
      section: t.languages,
    });
    suggestions.add(t.qualitySuggestionEnglish);
  }

  const score = Math.max(
    0,
    100 -
      issues.reduce((total, issue) => total + (issue.severity === "error" ? 18 : 10), 0)
  );

  return {
    isDraft: false,
    score,
    strongCount: Math.max(totalChecks - issues.length, 0),
    needsAttentionCount: issues.length,
    issues,
    suggestions: Array.from(suggestions),
    draftChecklist: [],
  };
}

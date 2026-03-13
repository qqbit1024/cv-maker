import type { ResumePreset } from "../types/resume";

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function getVisibleJobLabel(preset: ResumePreset, index: number): string {
  const job = preset.resume.sections.experience.jobs.filter((item) => !item.hidden)[index];

  if (!job) {
    return "";
  }

  const company = normalizeText(job.company);
  const title = normalizeText(job.title);

  if (company && title) {
    return `${company} / ${title}`;
  }

  return company || title || `${index + 1}.`;
}

function getVisibleJobs(preset: ResumePreset) {
  return preset.resume.sections.experience.jobs.filter((job) => !job.hidden);
}

function getVisibleBullets(preset: ResumePreset) {
  return getVisibleJobs(preset).flatMap((job) =>
    job.tasks
      .filter((task) => !task.hidden)
      .map((task) => normalizeText(task.text))
      .filter(Boolean)
  );
}

function getVisibleEducation(preset: ResumePreset) {
  return preset.resume.sections.education.entries
    .map((entry) => normalizeText(entry.course))
    .filter(Boolean);
}

function getVisibleCertificates(preset: ResumePreset) {
  return preset.resume.sections.certificates.items
    .filter((item) => !item.hidden)
    .map((item) => normalizeText(item.course))
    .filter(Boolean);
}

function getVisibleLanguages(preset: ResumePreset) {
  return (preset.resume.sections.languages.items ?? [])
    .map((item) =>
      [normalizeText(item.name), normalizeText(item.level)].filter(Boolean).join(": ")
    )
    .filter(Boolean);
}

function getVisibleSkills(preset: ResumePreset) {
  return preset.skills.items.map(normalizeText).filter(Boolean);
}

export interface VersionDiffResult {
  changedSections: string[];
  changedCount: number;
  counts: {
    contacts: { left: number; right: number };
    jobs: { left: number; right: number };
    bullets: { left: number; right: number };
    education: { left: number; right: number };
    certificates: { left: number; right: number };
    languages: { left: number; right: number };
    skills: { left: number; right: number };
  };
  skillsAdded: string[];
  skillsRemoved: string[];
  jobsAdded: string[];
  jobsRemoved: string[];
  jobsUpdated: string[];
}

export function compareVersions(left: ResumePreset, right: ResumePreset): VersionDiffResult {
  const leftContacts = (left.resume.header.contacts ?? []).map(normalizeText).filter(Boolean);
  const rightContacts = (right.resume.header.contacts ?? []).map(normalizeText).filter(Boolean);
  const leftJobs = getVisibleJobs(left);
  const rightJobs = getVisibleJobs(right);
  const leftEducation = getVisibleEducation(left);
  const rightEducation = getVisibleEducation(right);
  const leftCertificates = getVisibleCertificates(left);
  const rightCertificates = getVisibleCertificates(right);
  const leftLanguages = getVisibleLanguages(left);
  const rightLanguages = getVisibleLanguages(right);
  const leftSkills = getVisibleSkills(left);
  const rightSkills = getVisibleSkills(right);
  const leftBullets = getVisibleBullets(left);
  const rightBullets = getVisibleBullets(right);
  const leftSummary = Array.isArray(left.resume.sections.summary.content)
    ? left.resume.sections.summary.content.join(" ")
    : normalizeText(left.resume.sections.summary.content);
  const rightSummary = Array.isArray(right.resume.sections.summary.content)
    ? right.resume.sections.summary.content.join(" ")
    : normalizeText(right.resume.sections.summary.content);

  const jobsAdded = uniqueValues(
    rightJobs
      .map((_, index) => getVisibleJobLabel(right, index))
      .filter((label) => !leftJobs.some((__, leftIndex) => getVisibleJobLabel(left, leftIndex) === label))
  );
  const jobsRemoved = uniqueValues(
    leftJobs
      .map((_, index) => getVisibleJobLabel(left, index))
      .filter((label) => !rightJobs.some((__, rightIndex) => getVisibleJobLabel(right, rightIndex) === label))
  );

  const jobsUpdated = uniqueValues(
    leftJobs.flatMap((job, index) => {
      const rightJob = rightJobs[index];

      if (!rightJob) {
        return [];
      }

      const changed =
        normalizeText(job.title) !== normalizeText(rightJob.title) ||
        normalizeText(job.company) !== normalizeText(rightJob.company) ||
        normalizeText(job.period) !== normalizeText(rightJob.period) ||
        normalizeText(job.notes) !== normalizeText(rightJob.notes) ||
        job.tasks
          .filter((task) => !task.hidden)
          .map((task) => normalizeText(task.text))
          .join("|") !==
          rightJob.tasks
            .filter((task) => !task.hidden)
            .map((task) => normalizeText(task.text))
            .join("|");

      return changed ? [getVisibleJobLabel(right, index) || getVisibleJobLabel(left, index)] : [];
    })
  );

  const skillsAdded = uniqueValues(rightSkills.filter((skill) => !leftSkills.includes(skill)));
  const skillsRemoved = uniqueValues(leftSkills.filter((skill) => !rightSkills.includes(skill)));

  const changedSections = uniqueValues([
    normalizeText(left.resume.header.name) !== normalizeText(right.resume.header.name) ||
    normalizeText(left.resume.header.title) !== normalizeText(right.resume.header.title) ||
    leftContacts.join("|") !== rightContacts.join("|")
      ? "header"
      : "",
    leftSummary !== rightSummary ? "summary" : "",
    jobsAdded.length || jobsRemoved.length || jobsUpdated.length || leftBullets.length !== rightBullets.length
      ? "experience"
      : "",
    leftEducation.join("|") !== rightEducation.join("|") ? "education" : "",
    leftCertificates.join("|") !== rightCertificates.join("|") ? "certificates" : "",
    leftLanguages.join("|") !== rightLanguages.join("|") ? "languages" : "",
    skillsAdded.length || skillsRemoved.length ? "skills" : "",
    left.pdfFileName !== right.pdfFileName ? "pdf" : "",
    left.templateId !== right.templateId ? "template" : "",
  ]);

  return {
    changedSections,
    changedCount: changedSections.length,
    counts: {
      contacts: { left: leftContacts.length, right: rightContacts.length },
      jobs: { left: leftJobs.length, right: rightJobs.length },
      bullets: { left: leftBullets.length, right: rightBullets.length },
      education: { left: leftEducation.length, right: rightEducation.length },
      certificates: { left: leftCertificates.length, right: rightCertificates.length },
      languages: { left: leftLanguages.length, right: rightLanguages.length },
      skills: { left: leftSkills.length, right: rightSkills.length },
    },
    skillsAdded,
    skillsRemoved,
    jobsAdded,
    jobsRemoved,
    jobsUpdated,
  };
}

export type InterfaceLanguageCode =
  | "ru"
  | "en"
  | "de"
  | "es"
  | "it"
  | "pt"
  | "sr"
  | "fr"
  | "pl"
  | "uk";
export type ThemeMode = "light" | "dark";
export type BuiltInResumeLanguageCode = "ru" | "en";
export type ResumeLanguageCode = string;
export type ModalType = "import" | "export" | null;
export type ImportTarget = ResumeLanguageCode | "skills";
export type Direction = "up" | "down";

export interface ResumeHeader {
  name: string;
  title: string;
  contact: string;
  contacts?: string[];
}

export interface SummarySection {
  title: string;
  content: string | string[];
}

export interface JobTask {
  text: string;
  hidden?: boolean;
}

export interface Job {
  title: string;
  company: string;
  period: string;
  tasks: JobTask[];
  notes: string;
  hidden?: boolean;
}

export interface ExperienceSection {
  title: string;
  jobs: Job[];
}

export interface CourseEntry {
  course: string;
  hidden?: boolean;
}

export interface EducationSection {
  title: string;
  entries: CourseEntry[];
  _commentedEntries?: CourseEntry[];
}

export interface CertificatesSection {
  title: string;
  items: CourseEntry[];
}

export interface LegacyCertificatesSection {
  title: string;
  items: CourseEntry[];
  _commentedItems?: CourseEntry[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface LanguagesSection {
  title: string;
  content: string;
  items?: LanguageItem[];
}

export interface SkillsSection {
  title: string;
}

export interface ResumeSections {
  summary: SummarySection;
  experience: ExperienceSection;
  education: EducationSection;
  certificates: CertificatesSection;
  _commentedCertificates?: LegacyCertificatesSection;
  languages: LanguagesSection;
  skills: SkillsSection;
  additionalEducation?: EducationSection;
}

export interface ResumeData {
  header: ResumeHeader;
  sections: ResumeSections;
}

export interface SkillsData {
  items: string[];
  columns: number;
}

export interface ResumeStudioState {
  resumes: Record<ResumeLanguageCode, ResumeData>;
  skills: SkillsData;
  pdfFileNames: Record<ResumeLanguageCode, string>;
  resumeLanguageLabels: Record<ResumeLanguageCode, string>;
}

export interface LanguageOption {
  code: InterfaceLanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export interface ResumeProgressItem {
  language: ResumeLanguageCode;
  label: string;
  completed: number;
  total: number;
  percent: number;
}

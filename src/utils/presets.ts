import type {
  ResumeData,
  ResumeLanguageCode,
  ResumePreset,
  SkillsData,
} from "../types/resume";
import { clone, ensurePdfFileName, normalizeResume, normalizeSkills } from "./resumeState";

const PRESETS_STORAGE_KEY = "resume-studio-presets-v1";

type PresetsRecord = Record<ResumeLanguageCode, ResumePreset[]>;

function createPresetId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `preset_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function normalizePreset(preset: unknown): ResumePreset | null {
  const source = (preset ?? {}) as Partial<ResumePreset>;
  const id = String(source.id ?? "").trim() || createPresetId();
  const name = String(source.name ?? "").trim();
  const language = String(source.language ?? "").trim();

  if (!name || !language) {
    return null;
  }

  const createdAt = String(source.createdAt ?? source.updatedAt ?? new Date().toISOString());
  const updatedAt = String(source.updatedAt ?? createdAt);
  const resume = normalizeResume(source.resume);
  const skills = normalizeSkills(source.skills);

  return {
    id,
    language,
    name,
    resume,
    skills,
    pdfFileName: ensurePdfFileName(source.pdfFileName, language, resume),
    createdAt,
    updatedAt,
  };
}

function normalizePresets(source: unknown): PresetsRecord {
  if (!source || typeof source !== "object") {
    return {};
  }

  return Object.entries(source as Record<string, unknown>).reduce<PresetsRecord>(
    (result, [language, presets]) => {
      const normalizedItems = Array.isArray(presets)
        ? presets.map(normalizePreset).filter((item): item is ResumePreset => item != null)
        : [];

      if (!normalizedItems.length) {
        return result;
      }

      return {
        ...result,
        [language]: normalizedItems,
      };
    },
    {}
  );
}

export function loadPresets(): PresetsRecord {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PRESETS_STORAGE_KEY);
    return raw ? normalizePresets(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

export function savePresets(presets: PresetsRecord) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PRESETS_STORAGE_KEY, JSON.stringify(presets));
}

export function createPresetSnapshot({
  language,
  name,
  resume,
  skills,
  pdfFileName,
}: {
  language: ResumeLanguageCode;
  name: string;
  resume: ResumeData;
  skills: SkillsData;
  pdfFileName: string;
}): ResumePreset {
  const timestamp = new Date().toISOString();

  return {
    id: createPresetId(),
    language,
    name: name.trim(),
    resume: clone(resume),
    skills: clone(skills),
    pdfFileName: ensurePdfFileName(pdfFileName, language, resume),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function updatePresetSnapshot(
  preset: ResumePreset,
  payload: {
    resume: ResumeData;
    skills: SkillsData;
    pdfFileName: string;
  }
): ResumePreset {
  return {
    ...preset,
    resume: clone(payload.resume),
    skills: clone(payload.skills),
    pdfFileName: ensurePdfFileName(payload.pdfFileName, preset.language, payload.resume),
    updatedAt: new Date().toISOString(),
  };
}

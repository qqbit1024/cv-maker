import { useEffect, useMemo, useState } from "react";
import { Check, Pencil, RefreshCcw, Save, Trash2 } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import IconButton from "../components/IconButton";
import InputModal from "../components/InputModal";
import { useStudioOutlet } from "../hooks/useStudioOutlet";
import type { ResumePreset } from "../types/resume";
import {
  createPresetSnapshot,
  loadPresets,
  savePresets,
  updatePresetSnapshot,
} from "../utils/presets";

type PresetsRecord = Record<string, ResumePreset[]>;

export default function VersionsPage() {
  const studio = useStudioOutlet();
  const [presetsByLanguage, setPresetsByLanguage] = useState<PresetsRecord>(() => loadPresets());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [renameState, setRenameState] = useState<{ id: string; value: string } | null>(null);
  const [deletePresetId, setDeletePresetId] = useState<string | null>(null);
  const [overwritePresetId, setOverwritePresetId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    savePresets(presetsByLanguage);
  }, [presetsByLanguage]);

  const presets = presetsByLanguage[studio.activeLanguage] ?? [];
  const deletePreset = deletePresetId
    ? presets.find((preset) => preset.id === deletePresetId) ?? null
    : null;
  const overwritePreset = overwritePresetId
    ? presets.find((preset) => preset.id === overwritePresetId) ?? null
    : null;

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat(studio.uiLanguage, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [studio.uiLanguage]
  );

  const saveCurrentVersion = () => {
    const nextName = createName.trim();

    if (!nextName) {
      return;
    }

    const nextPreset = createPresetSnapshot({
      language: studio.activeLanguage,
      name: nextName,
      resume: studio.resume,
      skills: studio.skills,
      pdfFileName: studio.pdfFileName,
    });

    setPresetsByLanguage((current) => ({
      ...current,
      [studio.activeLanguage]: [nextPreset, ...(current[studio.activeLanguage] ?? [])],
    }));
    setIsCreateModalOpen(false);
    setCreateName("");
    setNotice(studio.t.versionSaved(nextName));
  };

  const renamePreset = () => {
    const nextName = renameState?.value.trim();

    if (!renameState || !nextName) {
      return;
    }

    setPresetsByLanguage((current) => ({
      ...current,
      [studio.activeLanguage]: (current[studio.activeLanguage] ?? []).map((preset) =>
        preset.id === renameState.id ? { ...preset, name: nextName } : preset
      ),
    }));
    setRenameState(null);
    setNotice(studio.t.versionRenamed(nextName));
  };

  const applyPreset = (preset: ResumePreset) => {
    studio.applyActiveWorkspaceSnapshot(preset);
    setNotice(studio.t.versionApplied(preset.name));
  };

  const confirmDeletePreset = () => {
    if (!deletePresetId) {
      return;
    }

    const deletedName = deletePreset?.name ?? "";

    setPresetsByLanguage((current) => {
      const nextItems = (current[studio.activeLanguage] ?? []).filter(
        (preset) => preset.id !== deletePresetId
      );

      return {
        ...current,
        [studio.activeLanguage]: nextItems,
      };
    });
    setDeletePresetId(null);
    setNotice(studio.t.versionDeleted(deletedName));
  };

  const confirmOverwritePreset = () => {
    if (!overwritePresetId) {
      return;
    }

    let overwrittenName = "";
    setPresetsByLanguage((current) => ({
      ...current,
      [studio.activeLanguage]: (current[studio.activeLanguage] ?? []).map((preset) => {
        if (preset.id !== overwritePresetId) {
          return preset;
        }

        overwrittenName = preset.name;
        return updatePresetSnapshot(preset, {
          resume: studio.resume,
          skills: studio.skills,
          pdfFileName: studio.pdfFileName,
        });
      }),
    }));
    setOverwritePresetId(null);
    setNotice(studio.t.versionOverwritten(overwrittenName));
  };

  return (
    <>
      <section className="page-panel">
        <div className="page-panel__header">
          <div className="page-panel__title-block">
            <p className="page-panel__eyebrow">{studio.t.navVersions}</p>
            <h2>{studio.t.versionsTitle}</h2>
            <p>{studio.t.versionsDescription}</p>
          </div>
          <div className="page-panel__actions">
            <button
              type="button"
              className="button--with-icon"
              onClick={() => {
                setCreateName(studio.t.versionDefaultName(studio.activeResumeLanguageLabel));
                setIsCreateModalOpen(true);
              }}
            >
              <Save className="button__icon" strokeWidth={2} />
              <span>{studio.t.saveVersion}</span>
            </button>
          </div>
        </div>

        <div className="page-panel__body">
          <div className="status-block">
            <p className="status-caption">{studio.t.activeResumeLanguage}</p>
            <p className="status">{studio.activeResumeLanguageLabel}</p>
          </div>

          {notice ? <p className="page-note">{notice}</p> : null}

          {presets.length ? (
            <div className="version-list">
              {presets.map((preset) => (
                <article key={preset.id} className="version-card">
                  <div className="version-card__header">
                    <div>
                      <h3>{preset.name}</h3>
                      <p>{studio.t.versionUpdatedAt(formatter.format(new Date(preset.updatedAt)))}</p>
                    </div>
                    <div className="version-card__actions">
                      <button
                        type="button"
                        className="button--with-icon button--small"
                        onClick={() => applyPreset(preset)}
                      >
                        <Check className="button__icon" strokeWidth={2} />
                        <span>{studio.t.applyVersion}</span>
                      </button>
                      <IconButton
                        icon={RefreshCcw}
                        label={studio.t.overwriteVersion}
                        tone="ghost"
                        onClick={() => setOverwritePresetId(preset.id)}
                      />
                      <IconButton
                        icon={Pencil}
                        label={studio.t.renameVersion}
                        tone="ghost"
                        onClick={() => setRenameState({ id: preset.id, value: preset.name })}
                      />
                      <IconButton
                        icon={Trash2}
                        label={studio.t.deleteVersion}
                        tone="ghost"
                        onClick={() => setDeletePresetId(preset.id)}
                      />
                    </div>
                  </div>

                  <dl className="version-card__meta">
                    <div>
                      <dt>{studio.t.jobs}</dt>
                      <dd>{preset.resume.sections.experience.jobs.filter((job) => !job.hidden).length}</dd>
                    </div>
                    <div>
                      <dt>{studio.t.skills}</dt>
                      <dd>{preset.skills.items.filter((item) => String(item ?? "").trim()).length}</dd>
                    </div>
                    <div>
                      <dt>{studio.t.pdfFileName}</dt>
                      <dd>{preset.pdfFileName}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{studio.t.noVersionsTitle}</h3>
              <p>{studio.t.noVersionsDescription}</p>
            </div>
          )}
        </div>
      </section>

      {isCreateModalOpen ? (
        <InputModal
          title={studio.t.saveVersionTitle}
          label={studio.t.versionName}
          placeholder={studio.t.versionNamePlaceholder}
          value={createName}
          confirmLabel={studio.t.saveVersionConfirm}
          closeLabel={studio.t.closeModal}
          onChange={setCreateName}
          onConfirm={saveCurrentVersion}
          onClose={() => {
            setIsCreateModalOpen(false);
            setCreateName("");
          }}
        />
      ) : null}

      {renameState ? (
        <InputModal
          title={studio.t.renameVersionTitle}
          label={studio.t.versionName}
          placeholder={studio.t.versionNamePlaceholder}
          value={renameState.value}
          confirmLabel={studio.t.renameVersionConfirm}
          closeLabel={studio.t.closeModal}
          onChange={(value) => setRenameState((current) => (current ? { ...current, value } : current))}
          onConfirm={renamePreset}
          onClose={() => setRenameState(null)}
        />
      ) : null}

      {deletePreset ? (
        <ConfirmModal
          title={studio.t.deleteVersion}
          message={studio.t.deleteVersionConfirm(deletePreset.name)}
          confirmLabel={studio.t.deleteVersion}
          closeLabel={studio.t.closeModal}
          onConfirm={confirmDeletePreset}
          onClose={() => setDeletePresetId(null)}
        />
      ) : null}

      {overwritePreset ? (
        <ConfirmModal
          title={studio.t.overwriteVersion}
          message={studio.t.overwriteVersionConfirm(overwritePreset.name)}
          confirmLabel={studio.t.overwriteVersion}
          closeLabel={studio.t.closeModal}
          onConfirm={confirmOverwritePreset}
          onClose={() => setOverwritePresetId(null)}
        />
      ) : null}
    </>
  );
}

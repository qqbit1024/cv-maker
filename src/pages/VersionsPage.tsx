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
import { compareVersions } from "../utils/versionDiff";

type PresetsRecord = Record<string, ResumePreset[]>;

export default function VersionsPage() {
  const studio = useStudioOutlet();
  const [presetsByLanguage, setPresetsByLanguage] = useState<PresetsRecord>(() => loadPresets());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [renameState, setRenameState] = useState<{ id: string; value: string } | null>(null);
  const [deletePresetId, setDeletePresetId] = useState<string | null>(null);
  const [overwritePresetId, setOverwritePresetId] = useState<string | null>(null);
  const [compareLeftId, setCompareLeftId] = useState<string | null>(null);
  const [compareRightId, setCompareRightId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    savePresets(presetsByLanguage);
  }, [presetsByLanguage]);

  const presets = presetsByLanguage[studio.activeLanguage] ?? [];
  useEffect(() => {
    if (!presets.length) {
      setCompareLeftId(null);
      setCompareRightId(null);
      return;
    }

    setCompareLeftId((current) =>
      current && presets.some((preset) => preset.id === current) ? current : presets[0]?.id ?? null
    );
    setCompareRightId((current) => {
      if (current && presets.some((preset) => preset.id === current)) {
        return current;
      }

      return presets[1]?.id ?? presets[0]?.id ?? null;
    });
  }, [presets]);

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
  const compareLeft = compareLeftId
    ? presets.find((preset) => preset.id === compareLeftId) ?? null
    : null;
  const compareRight = compareRightId
    ? presets.find((preset) => preset.id === compareRightId) ?? null
    : null;
  const versionDiff =
    compareLeft && compareRight && compareLeft.id !== compareRight.id
      ? compareVersions(compareLeft, compareRight)
      : null;
  const diffSectionLabels = useMemo(() => {
    if (!versionDiff) {
      return [];
    }

    return versionDiff.changedSections.map((section) => {
      if (section === "header") {
        return studio.t.header;
      }

      if (section === "summary") {
        return studio.t.summary;
      }

      if (section === "experience") {
        return studio.t.experience;
      }

      if (section === "education") {
        return studio.t.education;
      }

      if (section === "certificates") {
        return studio.t.certificates;
      }

      if (section === "languages") {
        return studio.t.languages;
      }

      if (section === "skills") {
        return studio.t.skills;
      }

      if (section === "template") {
        return studio.t.pdfTemplate;
      }

      if (section === "pdf") {
        return studio.t.pdfFileName;
      }

      return section;
    });
  }, [studio.t, versionDiff]);

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
      templateId: studio.activeResumeTemplate,
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
          templateId: studio.activeResumeTemplate,
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

          {presets.length > 1 ? (
            <section className="insight-card version-diff">
              <div className="version-diff__header">
                <div>
                  <h3>{studio.t.versionsCompareTitle}</h3>
                  <p>{studio.t.versionsCompareDescription}</p>
                </div>
              </div>

              <div className="version-diff__selector-grid">
                <div className="version-diff__selector">
                  <span className="status-caption">{studio.t.compareSourceVersion}</span>
                  <div className="version-diff__option-list">
                    {presets.map((preset) => (
                      <button
                        key={`left-${preset.id}`}
                        type="button"
                        className={`version-diff__option${
                          compareLeftId === preset.id ? " version-diff__option--active" : ""
                        }`}
                        onClick={() => setCompareLeftId(preset.id)}
                      >
                        <strong>{preset.name}</strong>
                        <span>{formatter.format(new Date(preset.updatedAt))}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="version-diff__selector">
                  <span className="status-caption">{studio.t.compareTargetVersion}</span>
                  <div className="version-diff__option-list">
                    {presets.map((preset) => (
                      <button
                        key={`right-${preset.id}`}
                        type="button"
                        className={`version-diff__option${
                          compareRightId === preset.id ? " version-diff__option--active" : ""
                        }`}
                        onClick={() => setCompareRightId(preset.id)}
                      >
                        <strong>{preset.name}</strong>
                        <span>{formatter.format(new Date(preset.updatedAt))}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {versionDiff ? (
                <>
                  <div className="vacancy-grid version-diff__metrics">
                    <div className="vacancy-score-card">
                      <span className="vacancy-score-card__label">{studio.t.versionDiffChanged}</span>
                      <strong>{versionDiff.changedCount}</strong>
                    </div>
                    <div className="vacancy-score-card">
                      <span className="vacancy-score-card__label">{studio.t.versionDiffSkillsAdded}</span>
                      <strong>{versionDiff.skillsAdded.length}</strong>
                    </div>
                    <div className="vacancy-score-card">
                      <span className="vacancy-score-card__label">{studio.t.versionDiffSkillsRemoved}</span>
                      <strong>{versionDiff.skillsRemoved.length}</strong>
                    </div>
                  </div>

                  <div className="page-card-grid version-diff__cards">
                    <div className="insight-card">
                      <h3>{studio.t.versionDiffChangedSections}</h3>
                      <div className="tag-list">
                        {diffSectionLabels.length ? (
                          diffSectionLabels.map((label) => (
                            <span key={label} className="tag">
                              {label}
                            </span>
                          ))
                        ) : (
                          <span className="tag tag--success">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="insight-card">
                      <h3>{studio.t.versionDiffAddedJobs}</h3>
                      <div className="tag-list">
                        {versionDiff.jobsAdded.length ? (
                          versionDiff.jobsAdded.map((job) => (
                            <span key={job} className="tag tag--success">
                              {job}
                            </span>
                          ))
                        ) : (
                          <span className="tag">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="insight-card">
                      <h3>{studio.t.versionDiffRemovedJobs}</h3>
                      <div className="tag-list">
                        {versionDiff.jobsRemoved.length ? (
                          versionDiff.jobsRemoved.map((job) => (
                            <span key={job} className="tag tag--error">
                              {job}
                            </span>
                          ))
                        ) : (
                          <span className="tag">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="insight-card">
                      <h3>{studio.t.versionDiffUpdatedJobs}</h3>
                      <div className="tag-list">
                        {versionDiff.jobsUpdated.length ? (
                          versionDiff.jobsUpdated.map((job) => (
                            <span key={job} className="tag tag--warning">
                              {job}
                            </span>
                          ))
                        ) : (
                          <span className="tag">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="insight-card">
                      <h3>{studio.t.versionDiffSkillsAdded}</h3>
                      <div className="tag-list">
                        {versionDiff.skillsAdded.length ? (
                          versionDiff.skillsAdded.map((skill) => (
                            <span key={skill} className="tag tag--success">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="tag">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>

                    <div className="insight-card">
                      <h3>{studio.t.versionDiffSkillsRemoved}</h3>
                      <div className="tag-list">
                        {versionDiff.skillsRemoved.length ? (
                          versionDiff.skillsRemoved.map((skill) => (
                            <span key={skill} className="tag tag--error">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="tag">{studio.t.versionDiffNoChangesTitle}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <h3>{studio.t.versionDiffNoChangesTitle}</h3>
                  <p>{studio.t.versionDiffNoChangesDescription}</p>
                </div>
              )}
            </section>
          ) : null}

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
                    <div>
                      <dt>{studio.t.pdfTemplate}</dt>
                      <dd>{studio.t.templateLabel(preset.templateId)}</dd>
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

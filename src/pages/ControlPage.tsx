import { useState } from "react";
import {
  BriefcaseBusiness,
  Copy,
  Download,
  FileDown,
  FilePlus2,
  GraduationCap,
  Languages as LanguagesIcon,
  LogIn,
  Pencil,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import InputModal from "../components/InputModal";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

export default function ControlPage() {
  const studio = useStudioOutlet();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [renameState, setRenameState] = useState<{ id: string; value: string } | null>(null);
  const [deleteResumeId, setDeleteResumeId] = useState<string | null>(null);

  const summaryItems = [
    { key: "contacts", label: studio.t.contacts, value: studio.totalContacts, icon: UserRound },
    { key: "jobs", label: studio.t.jobs, value: studio.jobs.length, icon: BriefcaseBusiness },
    {
      key: "education",
      label: studio.t.education,
      value: studio.totalEducation,
      icon: GraduationCap,
    },
    {
      key: "certificates",
      label: studio.t.certificates,
      value: studio.totalCertificates,
      icon: Sparkles,
    },
    {
      key: "languages",
      label: studio.t.languages,
      value: studio.totalLanguages,
      icon: LanguagesIcon,
    },
    { key: "skills", label: studio.t.skills, value: studio.totalSkills, icon: Sparkles },
  ];

  const isAuthenticated = studio.authStatus === "authenticated";
  const deleteResume = deleteResumeId
    ? studio.savedResumes.find((r) => r.id === deleteResumeId) ?? null
    : null;

  const handleCreateResume = async () => {
    const title = createTitle.trim();
    if (!title) return;
    await studio.createNewResume(title);
    setIsCreateModalOpen(false);
    setCreateTitle("");
  };

  const handleRenameResume = async () => {
    const title = renameState?.value.trim();
    if (!renameState || !title) return;
    await studio.renameSavedResume(renameState.id, title);
    setRenameState(null);
  };

  const handleDeleteResume = async () => {
    if (!deleteResumeId) return;
    await studio.deleteSavedResume(deleteResumeId);
    setDeleteResumeId(null);
  };

  const formatter = new Intl.DateTimeFormat(studio.uiLanguage, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <section className="page-panel">
        <div className="page-panel__header">
          <div className="page-panel__title-block">
            <p className="page-panel__eyebrow">{studio.t.navControl}</p>
            <h2>{studio.t.controlTitle}</h2>
            <p>{studio.t.controlDescription}</p>
          </div>
        </div>

        <div className="page-panel__body page-panel__body--control">
          {/* ======== Saved Resumes Section ======== */}
          <section className="control-card control-card--resumes">
            <div className="control-card__header control-card__header--spread">
              <div className="control-card__title-block">
                <p className="sidebar-title">{studio.t.myResumes ?? "My Resumes"}</p>
                <p className="status">{studio.t.myResumesDescription ?? "Your resumes saved in the cloud"}</p>
              </div>

              {isAuthenticated ? (
                <button
                  type="button"
                  className="button--with-icon button--small"
                  onClick={() => {
                    setCreateTitle("");
                    setIsCreateModalOpen(true);
                  }}
                >
                  <FilePlus2 className="button__icon" strokeWidth={2} />
                  <span>{studio.t.createResume ?? "New Resume"}</span>
                </button>
              ) : null}
            </div>

            {isAuthenticated ? (
              studio.savedResumes.length > 0 ? (
                <div className="version-list">
                  {studio.savedResumes.map((resume) => {
                    const isActive = resume.id === studio.activeResumeId;

                    return (
                      <article
                        key={resume.id}
                        className={`version-card${isActive ? " version-card--active" : ""}`}
                      >
                        <div className="version-card__header">
                          <div>
                            <h3>
                              {resume.title}
                              {isActive ? (
                                <span className="tag tag--success" style={{ marginLeft: 8, fontSize: "0.75rem" }}>
                                  {studio.t.activeLabel ?? "active"}
                                </span>
                              ) : null}
                            </h3>
                            <p>{studio.t.versionUpdatedAt?.(formatter.format(new Date(resume.updatedAt))) ?? formatter.format(new Date(resume.updatedAt))}</p>
                          </div>
                          <div className="version-card__actions">
                            {!isActive ? (
                              <button
                                type="button"
                                className="button--with-icon button--small"
                                onClick={() => studio.switchResume(resume.id)}
                              >
                                <span>{studio.t.openResume ?? "Open"}</span>
                              </button>
                            ) : null}
                            <button
                              type="button"
                              className="icon-button icon-button--ghost"
                              title={studio.t.cloneResume ?? "Clone"}
                              onClick={() => studio.cloneSavedResume(resume.id)}
                            >
                              <Copy strokeWidth={2} size={16} />
                            </button>
                            <button
                              type="button"
                              className="icon-button icon-button--ghost"
                              title={studio.t.renameResume ?? "Rename"}
                              onClick={() => setRenameState({ id: resume.id, value: resume.title })}
                            >
                              <Pencil strokeWidth={2} size={16} />
                            </button>
                            <button
                              type="button"
                              className="icon-button icon-button--ghost"
                              title={studio.t.deleteResume ?? "Delete"}
                              onClick={() => setDeleteResumeId(resume.id)}
                            >
                              <Trash2 strokeWidth={2} size={16} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>{studio.t.noResumesTitle ?? "No resumes yet"}</h3>
                  <p>{studio.t.noResumesDescription ?? "Create your first resume to start saving in the cloud."}</p>
                </div>
              )
            ) : (
              <div className="empty-state">
                <LogIn strokeWidth={2} size={32} style={{ opacity: 0.4, marginBottom: 8 }} />
                <h3>{studio.t.loginToSaveTitle ?? "Sign in to save resumes"}</h3>
                <p>{studio.t.loginToSaveDescription ?? "Log in or create an account to save your resumes in the cloud."}</p>
              </div>
            )}
          </section>

          {/* ======== Files & State ======== */}
          <div className="control-hero-grid">
            <section className="control-card control-card--files">
              <div className="control-card__header">
                <div className="control-card__title-block">
                  <p className="sidebar-title">{studio.t.files}</p>
                  <p className="status">{studio.t.filesDescription}</p>
                </div>
              </div>

              <div className="control-action-grid">
                <button
                  type="button"
                  className="control-action-card"
                  onClick={() => studio.setModalType("import")}
                >
                  <Upload className="control-action-card__icon" strokeWidth={2} />
                  <span className="control-action-card__label">{studio.t.import}</span>
                </button>
                <button
                  type="button"
                  className="control-action-card"
                  onClick={() => studio.setModalType("export")}
                >
                  <Download className="control-action-card__icon" strokeWidth={2} />
                  <span className="control-action-card__label">{studio.t.export}</span>
                </button>
              </div>
            </section>

            <section className="control-card control-card--state">
              <div className="control-card__header control-card__header--spread">
                <div className="control-card__title-block">
                  <p className="sidebar-title">{studio.t.controlStateTitle}</p>
                  <p className="status">{studio.t.controlStateDescription}</p>
                </div>

                <div className="control-badge">
                  <span className="status-caption">{studio.t.activeResumeLanguage}</span>
                  <strong>{studio.activeResumeLanguageLabel}</strong>
                </div>
              </div>

              <div className="sidebar-stack">
                <div className="field">
                  <label className="field__label" htmlFor="pdf-file-name-page">
                    {studio.t.pdfFileName}
                  </label>
                  <input
                    id="pdf-file-name-page"
                    className="field__control field__control--mono"
                    value={studio.pdfFileName}
                    onChange={(event) => studio.updatePdfFileName(event.target.value)}
                  />
                  <p className="field__hint">{studio.t.pdfFileNameHint}</p>
                </div>

                <button
                  type="button"
                  className="button--primary button--with-icon control-download-button"
                  onClick={studio.downloadPdf}
                  disabled={studio.isGenerating}
                >
                  <FileDown className="button__icon" strokeWidth={2} />
                  {studio.isGenerating
                    ? studio.t.generating
                    : studio.t.downloadPdf(studio.activeResumeLanguageLabel)}
                </button>

                <div
                  className={`autosave-indicator${
                    studio.didAutoSave ? " autosave-indicator--active" : ""
                  }`}
                >
                  <span className="autosave-indicator__dot" aria-hidden="true" />
                  <span className="autosave-indicator__label">{studio.t.autosave}</span>
                  <span className="autosave-indicator__value">{studio.t.autosaveSaved}</span>
                </div>
              </div>
            </section>
          </div>

          {/* ======== Summary ======== */}
          <section className="control-card control-card--summary">
            <div className="control-card__header">
              <div className="control-card__title-block">
                <p className="sidebar-title">{studio.t.controlSummaryTitle}</p>
                <p className="status">{studio.t.controlSummaryDescription}</p>
              </div>
            </div>

            <div className="control-metrics-grid">
              {summaryItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.key} className="control-metric-card">
                    <div className="control-metric-card__icon-wrap">
                      <Icon className="control-metric-card__icon" strokeWidth={2} />
                    </div>
                    <div className="control-metric-card__content">
                      <span className="control-metric-card__label">{item.label}</span>
                      <strong className="control-metric-card__value">{item.value}</strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      {/* ======== Modals ======== */}
      {isCreateModalOpen ? (
        <InputModal
          title={studio.t.createResumeTitle ?? "Create Resume"}
          label={studio.t.resumeName ?? "Resume title"}
          placeholder={studio.t.resumeNamePlaceholder ?? "e.g. Frontend Developer CV"}
          value={createTitle}
          confirmLabel={studio.t.createResumeConfirm ?? "Create"}
          closeLabel={studio.t.closeModal}
          onChange={setCreateTitle}
          onConfirm={handleCreateResume}
          onClose={() => {
            setIsCreateModalOpen(false);
            setCreateTitle("");
          }}
        />
      ) : null}

      {renameState ? (
        <InputModal
          title={studio.t.renameResumeTitle ?? "Rename Resume"}
          label={studio.t.resumeName ?? "Resume title"}
          placeholder={studio.t.resumeNamePlaceholder ?? "e.g. Frontend Developer CV"}
          value={renameState.value}
          confirmLabel={studio.t.renameResumeConfirm ?? "Rename"}
          closeLabel={studio.t.closeModal}
          onChange={(value) => setRenameState((current) => (current ? { ...current, value } : current))}
          onConfirm={handleRenameResume}
          onClose={() => setRenameState(null)}
        />
      ) : null}

      {deleteResume ? (
        <ConfirmModal
          title={studio.t.deleteResume ?? "Delete Resume"}
          message={studio.t.deleteResumeConfirm?.(deleteResume.title) ?? `Are you sure you want to delete "${deleteResume.title}"?`}
          confirmLabel={studio.t.deleteResume ?? "Delete"}
          closeLabel={studio.t.closeModal}
          onConfirm={handleDeleteResume}
          onClose={() => setDeleteResumeId(null)}
        />
      ) : null}
    </>
  );
}

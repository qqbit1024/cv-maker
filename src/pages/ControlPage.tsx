import {
  BriefcaseBusiness,
  Download,
  FileDown,
  GraduationCap,
  Languages as LanguagesIcon,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

export default function ControlPage() {
  const studio = useStudioOutlet();
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

  return (
    <section className="page-panel">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navControl}</p>
          <h2>{studio.t.controlTitle}</h2>
          <p>{studio.t.controlDescription}</p>
        </div>
      </div>

      <div className="page-panel__body page-panel__body--control">
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
  );
}

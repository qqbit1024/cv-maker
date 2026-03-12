import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import IconButton from "./IconButton";
import type { UIText } from "../i18n/uiText";
import type {
  InterfaceLanguageCode,
  LanguageOption,
  ResumeLanguageCode,
  ResumeProgressItem,
} from "../types/resume";

interface AppSidebarProps {
  t: UIText;
  uiLanguage: InterfaceLanguageCode;
  activeLanguage: ResumeLanguageCode;
  activeLanguageLabel: string;
  interfaceLanguageOptions: LanguageOption[];
  resumeProgressItems: ResumeProgressItem[];
  status: string;
  pdfFileName: string;
  totalJobs: number;
  totalEducation: number;
  totalSkills: number;
  onChangeUiLanguage: (language: InterfaceLanguageCode) => void;
  onChangeResumeLanguage: (language: ResumeLanguageCode) => void;
  onChangePdfFileName: (value: string) => void;
  onOpenCreateResumeLanguage: () => void;
  onDeleteResumeLanguage: (language: ResumeLanguageCode) => void;
  onOpenImport: () => void;
  onOpenExport: () => void;
  onReset: () => void;
  onDownloadPdf: () => void;
  isGenerating: boolean;
}

export default function AppSidebar({
  t,
  uiLanguage,
  activeLanguage,
  activeLanguageLabel,
  interfaceLanguageOptions,
  resumeProgressItems,
  status,
  pdfFileName,
  totalJobs,
  totalEducation,
  totalSkills,
  onChangeUiLanguage,
  onChangeResumeLanguage,
  onChangePdfFileName,
  onOpenCreateResumeLanguage,
  onDeleteResumeLanguage,
  onOpenImport,
  onOpenExport,
  onReset,
  onDownloadPdf,
  isGenerating,
}: AppSidebarProps) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const activeInterfaceLanguageOption =
    interfaceLanguageOptions.find((option) => option.code === uiLanguage) ??
    interfaceLanguageOptions[0];

  return (
    <aside className="sidebar">
      <div className={`brand-card${isLanguageMenuOpen ? " brand-card--raised" : ""}`}>
        <div className="brand-card__top">
          <h1 className="brand-card__name">{t.appName}</h1>
          <div className="locale-menu" aria-label={t.interfaceLanguage}>
            <button
              type="button"
              className={`locale-menu__trigger${
                isLanguageMenuOpen ? " locale-menu__trigger--open" : ""
              }`}
              aria-haspopup="menu"
              aria-expanded={isLanguageMenuOpen}
              aria-label={t.interfaceLanguageMenuLabel}
              onClick={() => setIsLanguageMenuOpen((current) => !current)}
            >
              <span className="locale-menu__leading">
                <span className="locale-menu__flag" aria-hidden="true">
                  {activeInterfaceLanguageOption?.flag}
                </span>
              </span>
              <span className="locale-menu__caret" aria-hidden="true">
                <ChevronDown strokeWidth={2} />
              </span>
            </button>

            {isLanguageMenuOpen ? (
              <div className="locale-menu__dropdown" role="menu">
                {interfaceLanguageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className={`locale-menu__option${
                      option.code === uiLanguage ? " locale-menu__option--active" : ""
                    }`}
                    role="menuitemradio"
                    aria-checked={option.code === uiLanguage}
                    aria-label={option.label}
                  onClick={() => {
                      onChangeUiLanguage(option.code);
                      setIsLanguageMenuOpen(false);
                    }}
                  >
                    <span className="locale-menu__option-flag" aria-hidden="true">
                      {option.flag}
                    </span>
                    <span>{option.nativeLabel}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="sidebar-panel">
        <div className="sidebar-panel__header">
          <p className="sidebar-title">{t.resumeLanguage}</p>
          <IconButton
            icon={Plus}
            label={t.addResumeLanguage}
            className="sidebar-panel__icon-button"
            onClick={onOpenCreateResumeLanguage}
          />
        </div>
        <p className="status">{t.resumeLanguageHint}</p>
        <div className="resume-progress">
          {resumeProgressItems.map((item) => (
            <div
              key={item.language}
              className={`resume-progress__item${
                activeLanguage === item.language ? " resume-progress__item--active" : ""
              }`}
            >
              <button
                type="button"
                className="resume-progress__main"
                onClick={() => onChangeResumeLanguage(item.language)}
              >
                <div className="resume-progress__row">
                  <strong>{item.label}</strong>
                  <span>{item.percent}%</span>
                </div>
                <div className="resume-progress__meta">
                  {t.fieldProgress(item.completed, item.total)}
                </div>
                <div className="resume-progress__bar" aria-hidden="true">
                  <span style={{ width: `${item.percent}%` }} />
                </div>
              </button>

              <IconButton
                icon={Trash2}
                label={t.deleteResumeLanguage}
                className="resume-progress__delete"
                tone="ghost"
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteResumeLanguage(item.language);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-panel">
        <p className="sidebar-title">{t.files}</p>
        <div className="action-grid">
          <button type="button" onClick={onOpenImport}>
            {t.import}
          </button>
          <button type="button" onClick={onOpenExport}>
            {t.export}
          </button>
          <button type="button" className="button--ghost" onClick={onReset}>
            {t.reset}
          </button>
        </div>
      </div>

      <div className="sidebar-panel">
        <p className="sidebar-title">{t.generate}</p>
        <div className="sidebar-stack">
          <div className="field">
            <label className="field__label" htmlFor="pdf-file-name">
              {t.pdfFileName}
            </label>
            <input
              id="pdf-file-name"
              className="field__control field__control--mono"
              value={pdfFileName}
              onChange={(event) => onChangePdfFileName(event.target.value)}
            />
            <p className="field__hint">{t.pdfFileNameHint}</p>
          </div>

          <button
            type="button"
            className="button--primary"
            onClick={onDownloadPdf}
            disabled={isGenerating}
          >
            {isGenerating ? t.generating : t.downloadPdf(activeLanguageLabel)}
          </button>
        </div>
      </div>

      <div className="sidebar-panel">
        <p className="sidebar-title">{t.snapshot}</p>
        <dl className="stats-list">
          <div>
            <dt>{t.jobs}</dt>
            <dd>{totalJobs}</dd>
          </div>
          <div>
            <dt>{t.education}</dt>
            <dd>{totalEducation}</dd>
          </div>
          <div>
            <dt>{t.skills}</dt>
            <dd>{totalSkills}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}

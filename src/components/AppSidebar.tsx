import { useState } from "react";
import { ChevronDown, Copy, Moon, Pencil, Plus, Sun, Trash2 } from "lucide-react";
import IconButton from "./IconButton";
import type { UIText } from "../i18n/uiText";
import type {
  InterfaceLanguageCode,
  LanguageOption,
  ResumeLanguageCode,
  ResumeProgressItem,
  ThemeMode,
} from "../types/resume";

interface AppSidebarProps {
  t: UIText;
  uiLanguage: InterfaceLanguageCode;
  theme: ThemeMode;
  activeLanguage: ResumeLanguageCode;
  activeLanguageLabel: string;
  interfaceLanguageOptions: LanguageOption[];
  resumeProgressItems: ResumeProgressItem[];
  pdfFileName: string;
  totalContacts: number;
  totalJobs: number;
  totalEducation: number;
  totalCertificates: number;
  totalLanguages: number;
  totalSkills: number;
  didAutoSave: boolean;
  onChangeUiLanguage: (language: InterfaceLanguageCode) => void;
  onToggleTheme: () => void;
  onChangeResumeLanguage: (language: ResumeLanguageCode) => void;
  onChangePdfFileName: (value: string) => void;
  onOpenCreateResumeLanguage: () => void;
  onDuplicateResumeLanguage: (language: ResumeLanguageCode) => void;
  onRenameResumeLanguage: (language: ResumeLanguageCode) => void;
  onDeleteResumeLanguage: (language: ResumeLanguageCode) => void;
  onOpenImport: () => void;
  onOpenExport: () => void;
  onDownloadPdf: () => void;
  isGenerating: boolean;
}

export default function AppSidebar({
  t,
  uiLanguage,
  theme,
  activeLanguage,
  activeLanguageLabel,
  interfaceLanguageOptions,
  resumeProgressItems,
  pdfFileName,
  totalContacts,
  totalJobs,
  totalEducation,
  totalCertificates,
  totalLanguages,
  totalSkills,
  didAutoSave,
  onChangeUiLanguage,
  onToggleTheme,
  onChangeResumeLanguage,
  onChangePdfFileName,
  onOpenCreateResumeLanguage,
  onDuplicateResumeLanguage,
  onRenameResumeLanguage,
  onDeleteResumeLanguage,
  onOpenImport,
  onOpenExport,
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
          <div className="brand-card__controls">
            <IconButton
              icon={theme === "light" ? Sun : Moon}
              label={theme === "light" ? t.switchToDarkTheme : t.switchToLightTheme}
              className="theme-toggle"
              tone="ghost"
              onClick={onToggleTheme}
            />
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
                </div>
                <div className="resume-progress__meta">
                  {t.fieldProgress(item.completed, item.total)}
                </div>
                <div className="resume-progress__bar" aria-hidden="true">
                  <span style={{ width: `${item.percent}%` }} />
                </div>
              </button>

              <div className="resume-progress__actions">
                <IconButton
                  icon={Copy}
                  label={t.duplicateResumeLanguage}
                  className="resume-progress__action"
                  tone="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDuplicateResumeLanguage(item.language);
                  }}
                />
                <IconButton
                  icon={Pencil}
                  label={t.renameResumeLanguage}
                  className="resume-progress__action"
                  tone="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRenameResumeLanguage(item.language);
                  }}
                />
                <IconButton
                  icon={Trash2}
                  label={t.deleteResumeLanguage}
                  className="resume-progress__action"
                  tone="ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteResumeLanguage(item.language);
                  }}
                />
              </div>
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
        </div>
        <div className={`autosave-indicator${didAutoSave ? " autosave-indicator--active" : ""}`}>
          <span className="autosave-indicator__dot" aria-hidden="true" />
          <span className="autosave-indicator__label">{t.autosave}</span>
          <span className="autosave-indicator__value">{t.autosaveSaved}</span>
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
            <dt>{t.contacts}</dt>
            <dd>{totalContacts}</dd>
          </div>
          <div>
            <dt>{t.jobs}</dt>
            <dd>{totalJobs}</dd>
          </div>
          <div>
            <dt>{t.education}</dt>
            <dd>{totalEducation}</dd>
          </div>
          <div>
            <dt>{t.certificates}</dt>
            <dd>{totalCertificates}</dd>
          </div>
          <div>
            <dt>{t.languages}</dt>
            <dd>{totalLanguages}</dd>
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

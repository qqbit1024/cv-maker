import { useState } from "react";
import {
  ChevronDown,
  Copy,
  Eye,
  FolderKanban,
  Gauge,
  Moon,
  Pencil,
  PenSquare,
  Plus,
  Sun,
  Target,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
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
  onChangeUiLanguage: (language: InterfaceLanguageCode) => void;
  onToggleTheme: () => void;
  onChangeResumeLanguage: (language: ResumeLanguageCode) => void;
  onOpenCreateResumeLanguage: () => void;
  onDuplicateResumeLanguage: (language: ResumeLanguageCode) => void;
  onRenameResumeLanguage: (language: ResumeLanguageCode) => void;
  onDeleteResumeLanguage: (language: ResumeLanguageCode) => void;
}

export default function AppSidebar({
  t,
  uiLanguage,
  theme,
  activeLanguage,
  activeLanguageLabel,
  interfaceLanguageOptions,
  resumeProgressItems,
  onChangeUiLanguage,
  onToggleTheme,
  onChangeResumeLanguage,
  onOpenCreateResumeLanguage,
  onDuplicateResumeLanguage,
  onRenameResumeLanguage,
  onDeleteResumeLanguage,
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

      <nav className="sidebar-panel">
        <p className="sidebar-title">{t.workspace}</p>
        <div className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => `sidebar-nav__link${isActive ? " sidebar-nav__link--active" : ""}`}>
            <PenSquare className="button__icon" strokeWidth={2} />
            <span>{t.navEditor}</span>
          </NavLink>
          <NavLink
            to="/versions"
            className={({ isActive }) => `sidebar-nav__link${isActive ? " sidebar-nav__link--active" : ""}`}
          >
            <FolderKanban className="button__icon" strokeWidth={2} />
            <span>{t.navVersions}</span>
          </NavLink>
          <NavLink
            to="/vacancy"
            className={({ isActive }) => `sidebar-nav__link${isActive ? " sidebar-nav__link--active" : ""}`}
          >
            <Target className="button__icon" strokeWidth={2} />
            <span>{t.navVacancy}</span>
          </NavLink>
          <NavLink
            to="/preview"
            className={({ isActive }) => `sidebar-nav__link${isActive ? " sidebar-nav__link--active" : ""}`}
          >
            <Eye className="button__icon" strokeWidth={2} />
            <span>{t.navPreview}</span>
          </NavLink>
          <NavLink
            to="/control"
            className={({ isActive }) => `sidebar-nav__link${isActive ? " sidebar-nav__link--active" : ""}`}
          >
            <Gauge className="button__icon" strokeWidth={2} />
            <span>{t.navControl}</span>
          </NavLink>
        </div>
      </nav>

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
    </aside>
  );
}

import { useState } from "react";
import { ChevronDown, LogIn, Moon, Sun, UserPlus } from "lucide-react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const studio = useStudioOutlet();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const activeInterfaceLanguageOption =
    studio.interfaceLanguageOptions.find((option) => option.code === studio.uiLanguage) ??
    studio.interfaceLanguageOptions[0];

  const submit = async () => {
    if (mode === "login") {
      await studio.login({ email, password });
      return;
    }

    await studio.register({
      name,
      email,
      password,
    });
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__header">
          <div>
            <p className="page-panel__eyebrow">{studio.t.appName}</p>
            <h1 className="auth-card__title">{studio.t.authTitle}</h1>
            <p className="auth-card__description">{studio.t.authDescription}</p>
          </div>

          <div className="brand-card__controls">
            <button
              type="button"
              className="theme-toggle"
              aria-label={studio.theme === "light" ? studio.t.switchToDarkTheme : studio.t.switchToLightTheme}
              onClick={studio.toggleTheme}
            >
              {studio.theme === "light" ? (
                <Sun className="button__icon" strokeWidth={2} />
              ) : (
                <Moon className="button__icon" strokeWidth={2} />
              )}
            </button>

            <div className="locale-menu" aria-label={studio.t.interfaceLanguage}>
              <button
                type="button"
                className={`locale-menu__trigger${
                  isLanguageMenuOpen ? " locale-menu__trigger--open" : ""
                }`}
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
                aria-label={studio.t.interfaceLanguageMenuLabel}
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
                  {studio.interfaceLanguageOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      className={`locale-menu__option${
                        option.code === studio.uiLanguage ? " locale-menu__option--active" : ""
                      }`}
                      role="menuitemradio"
                      aria-checked={option.code === studio.uiLanguage}
                      onClick={() => {
                        studio.setUiLanguage(option.code);
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

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab${mode === "login" ? " auth-tab--active" : ""}`}
            onClick={() => setMode("login")}
          >
            {studio.t.authLoginTab}
          </button>
          <button
            type="button"
            className={`auth-tab${mode === "register" ? " auth-tab--active" : ""}`}
            onClick={() => setMode("register")}
          >
            {studio.t.authRegisterTab}
          </button>
        </div>

        <div className="auth-form">
          {mode === "register" ? (
            <label className="field">
              <span className="field__label">{studio.t.name}</span>
              <input
                className="field__control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          ) : null}

          <label className="field">
            <span className="field__label">{studio.t.authEmail}</span>
            <input
              type="email"
              className="field__control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="field">
            <span className="field__label">{studio.t.authPassword}</span>
            <input
              type="password"
              className="field__control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  void submit();
                }
              }}
            />
          </label>

          {studio.authError ? <p className="page-note page-note--error">{studio.authError}</p> : null}

          <button
            type="button"
            className="button--primary button--with-icon auth-submit"
            onClick={() => {
              void submit();
            }}
            disabled={studio.isAuthenticating}
          >
            {mode === "login" ? (
              <LogIn className="button__icon" strokeWidth={2} />
            ) : (
              <UserPlus className="button__icon" strokeWidth={2} />
            )}
            <span>
              {studio.isAuthenticating
                ? studio.t.authLoading
                : mode === "login"
                  ? studio.t.authSubmitLogin
                  : studio.t.authSubmitRegister}
            </span>
          </button>

          <button
            type="button"
            className="button--ghost auth-switch"
            onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
          >
            {mode === "login" ? studio.t.authSwitchToRegister : studio.t.authSwitchToLogin}
          </button>
        </div>
      </div>
    </div>
  );
}

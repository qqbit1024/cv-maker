import { LogOut, Save, UserRound, KeyRound, ShieldAlert, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

export default function ProfilePage() {
  const studio = useStudioOutlet();
  
  const [firstName, setFirstName] = useState(studio.authUser?.firstName || "");
  const [lastName, setLastName] = useState(studio.authUser?.lastName || "");
  const [nickname, setNickname] = useState(studio.authUser?.nickname || "");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (studio.authUser) {
      setFirstName(studio.authUser.firstName || "");
      setLastName(studio.authUser.lastName || "");
      setNickname(studio.authUser.nickname || "");
    }
  }, [studio.authUser]);

  const handleUpdateProfile = async () => {
    setSuccessMessage("");
    await studio.updateProfile({ firstName, lastName, nickname });
    setSuccessMessage(studio.t.profileUpdated);
  };

  const handleUpdatePassword = async () => {
    setSuccessMessage("");
    setPasswordError("");
    
    if (newPassword !== confirmPassword) {
      setPasswordError(studio.t.passwordsDoNotMatch);
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError(studio.t.passwordTooShort);
      return;
    }

    try {
      await studio.updatePassword({ currentPassword, newPassword });
      setSuccessMessage(studio.t.passwordUpdated);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
    }
  };

  return (
    <section className="page-panel">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navProfile}</p>
          <h2>{studio.t.navProfile}</h2>
        </div>
      </div>

      <div className="page-panel__body page-panel__body--profile">
        <section className="control-card control-card--profile">
          <div className="control-card__header">
            <div className="control-card__title-block">
              <p className="sidebar-title">{studio.t.personalInfo}</p>
            </div>
          </div>

          <div className="profile-card__grid">
            <label className="field">
              <span className="field__label">{studio.t.firstName || "First Name"}</span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span className="profile-card__icon-wrap">
                  <UserRound className="profile-card__icon" strokeWidth={2} />
                </span>
                <input
                  className="field__control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={studio.t.firstNamePlaceholder || ""}
                />
              </div>
            </label>

            <label className="field">
              <span className="field__label">{studio.t.lastName || "Last Name"}</span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span className="profile-card__icon-wrap">
                  <UserRound className="profile-card__icon" strokeWidth={2} />
                </span>
                <input
                  className="field__control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={studio.t.lastNamePlaceholder || ""}
                />
              </div>
            </label>

            <label className="field">
              <span className="field__label">{studio.t.nickname || "Nickname"}</span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span className="profile-card__icon-wrap">
                  <UserRound className="profile-card__icon" strokeWidth={2} />
                </span>
                <input
                  className="field__control"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={studio.t.nicknamePlaceholder || ""}
                />
              </div>
            </label>
          </div>

          <div className="profile-card__actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
             <button
              type="button"
              className="button--primary button--small button--with-icon"
              onClick={handleUpdateProfile}
              disabled={studio.isAuthenticating}
            >
              <Save className="button__icon" strokeWidth={2} />
              {studio.t.saveChanges}
            </button>
          </div>
        </section>

        {studio.authStatus === "authenticated" && (
          <section className="control-card control-card--profile">
            <div className="control-card__header">
              <div className="control-card__title-block">
                <p className="sidebar-title">{studio.t.security}</p>
              </div>
            </div>

            <div className="stack" style={{ maxWidth: "400px" }}>
              <label className="field">
                <span className="field__label">{studio.t.currentPassword}</span>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="field__control"
                    style={{ paddingRight: "40px" }}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    style={{ position: "absolute", right: "12px", background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", color: "var(--text-secondary)" }}
                  >
                    {showCurrentPassword ? <EyeOff strokeWidth={2} size={18} /> : <Eye strokeWidth={2} size={18} />}
                  </button>
                </div>
              </label>

              <label className="field">
                <span className="field__label">{studio.t.newPassword}</span>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="field__control"
                    style={{ paddingRight: "40px" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: "absolute", right: "12px", background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", color: "var(--text-secondary)" }}
                  >
                    {showNewPassword ? <EyeOff strokeWidth={2} size={18} /> : <Eye strokeWidth={2} size={18} />}
                  </button>
                </div>
              </label>

              <label className="field">
                <span className="field__label">{studio.t.confirmNewPassword}</span>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="field__control"
                    style={{ paddingRight: "40px" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "12px", background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", color: "var(--text-secondary)" }}
                  >
                    {showConfirmPassword ? <EyeOff strokeWidth={2} size={18} /> : <Eye strokeWidth={2} size={18} />}
                  </button>
                </div>
              </label>

              {passwordError ? <p className="page-note page-note--error">{passwordError}</p> : null}
              {studio.authError ? <p className="page-note page-note--error">{studio.authError}</p> : null}
            </div>

            <div className="profile-card__actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
              <button
                type="button"
                className="button--secondary button--small button--with-icon"
                onClick={handleUpdatePassword}
                disabled={studio.isAuthenticating || !currentPassword || !newPassword}
              >
                <KeyRound className="button__icon" strokeWidth={2} />
                {studio.t.updatePassword}
              </button>
            </div>
          </section>
        )}

        {successMessage && (
          <div className="page-note" style={{ background: "var(--success-bg)", color: "var(--success-text)", borderColor: "var(--success-border)" }}>
            {successMessage}
          </div>
        )}

        <section className="control-card control-card--profile" style={{ marginTop: "2rem", border: "1px solid var(--danger)" }}>
          <div className="profile-card__actions" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <ShieldAlert className="button__icon" style={{ color: "var(--danger)" }} strokeWidth={2} />
              <span style={{ fontWeight: 600 }}>{studio.authUser?.email || studio.t.guestMode}</span>
            </div>
            <button
              type="button"
              className="button--ghost button--with-icon"
              style={{ color: "var(--danger)" }}
              onClick={studio.logout}
            >
              <LogOut className="button__icon" strokeWidth={2} />
              {studio.t.authLogout}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

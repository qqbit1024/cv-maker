import { LogOut, Mail, UserRound } from "lucide-react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";

export default function ProfilePage() {
  const studio = useStudioOutlet();

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
              <p className="sidebar-title">{studio.t.navProfile}</p>
            </div>
          </div>

          <div className="profile-card__grid">
            <article className="profile-card__item">
              <span className="profile-card__icon-wrap">
                <UserRound className="profile-card__icon" strokeWidth={2} />
              </span>
              <div className="profile-card__content">
                <span className="profile-card__label">{studio.t.name}</span>
                <strong className="profile-card__value">
                  {studio.authUser?.name || "—"}
                </strong>
              </div>
            </article>

            <article className="profile-card__item">
              <span className="profile-card__icon-wrap">
                <Mail className="profile-card__icon" strokeWidth={2} />
              </span>
              <div className="profile-card__content">
                <span className="profile-card__label">{studio.t.authEmail}</span>
                <strong className="profile-card__value">
                  {studio.authUser?.email || "—"}
                </strong>
              </div>
            </article>
          </div>

          <div className="profile-card__actions">
            <button
              type="button"
              className="button--ghost button--with-icon"
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

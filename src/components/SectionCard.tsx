import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export default function SectionCard({
  title,
  description,
  actions,
  children,
  collapsible = true,
  defaultCollapsed = false,
}: SectionCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <section className={`panel${isCollapsed ? " panel--collapsed" : ""}`}>
      <div className="panel__header">
        {collapsible ? (
          <button
            type="button"
            className="panel__toggle"
            onClick={() => setIsCollapsed((current) => !current)}
            aria-expanded={!isCollapsed}
          >
            <span
              className={`panel__toggle-icon${!isCollapsed ? " panel__toggle-icon--expanded" : ""}`}
              aria-hidden="true"
            >
              <ChevronDown strokeWidth={2} />
            </span>
            <span className="panel__title">
              <h2>{title}</h2>
              {description ? <p className="panel__description">{description}</p> : null}
            </span>
          </button>
        ) : (
          <div className="panel__title">
            <h2>{title}</h2>
            {description ? <p className="panel__description">{description}</p> : null}
          </div>
        )}
        {!isCollapsed && actions ? <div className="panel__actions">{actions}</div> : null}
      </div>
      {!isCollapsed ? <div className="panel__body">{children}</div> : null}
    </section>
  );
}

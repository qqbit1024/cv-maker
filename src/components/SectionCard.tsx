import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({ title, description, actions, children }: SectionCardProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">
          <h2>{title}</h2>
          {description ? <p className="panel__description">{description}</p> : null}
        </div>
        {actions ? <div className="panel__actions">{actions}</div> : null}
      </div>
      <div className="panel__body">{children}</div>
    </section>
  );
}

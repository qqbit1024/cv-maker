import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({ title, actions, children }: SectionCardProps) {
  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">
          <span className="panel__title-mark" aria-hidden="true" />
          <h2>{title}</h2>
        </div>
        {actions ? <div className="panel__actions">{actions}</div> : null}
      </div>
      <div className="panel__body">{children}</div>
    </section>
  );
}

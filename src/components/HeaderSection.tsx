import { Plus, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import type { UIText } from "../i18n/uiText";

interface HeaderSectionProps {
  t: UIText;
  name: string;
  title: string;
  contacts: string[];
  exampleName: string;
  exampleTitle: string;
  exampleContacts: string[];
  onChangeName: (value: string) => void;
  onChangeTitle: (value: string) => void;
  onChangeContact: (index: number, value: string) => void;
  onAddContact: () => void;
  onRemoveContact: (index: number) => void;
}

export default function HeaderSection({
  t,
  name,
  title,
  contacts,
  exampleName,
  exampleTitle,
  exampleContacts,
  onChangeName,
  onChangeTitle,
  onChangeContact,
  onAddContact,
  onRemoveContact,
}: HeaderSectionProps) {
  return (
    <SectionCard title={t.header} description={t.headerDescription}>
      <div className="field-grid">
        <Field label={t.name} value={name} onChange={onChangeName} autoClearValue={exampleName} />
        <Field
          label={t.role}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>

      <div className="stack">
        {contacts.map((contact, index) => (
          <div key={`contact-${index}`} className="task-row">
            <Field
              label={t.contact(index)}
              value={contact}
              onChange={(value) => onChangeContact(index, value)}
              autoClearValue={exampleContacts[index] ?? ""}
            />
            <IconButton icon={Trash2} label={t.deleteContact} onClick={() => onRemoveContact(index)} />
          </div>
        ))}

        <div className="job-card__footer">
          <button type="button" className="button--small button--with-icon" onClick={onAddContact}>
            <Plus className="button__icon" strokeWidth={2} />
            <span>{t.addContact}</span>
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

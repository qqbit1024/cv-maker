import { Plus, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import SelectField from "./SelectField";
import type { LanguageItem } from "../types/resume";
import type { UIText } from "../i18n/uiText";

interface LanguagesSectionProps {
  t: UIText;
  title: string;
  items: LanguageItem[];
  exampleTitle: string;
  exampleItems: LanguageItem[];
  levelOptions: string[];
  onChangeTitle: (value: string) => void;
  onUpdateLanguage: (index: number, field: "name" | "level", value: string) => void;
  onAddLanguage: () => void;
  onRemoveLanguage: (index: number) => void;
}

export default function LanguagesSection({
  t,
  title,
  items,
  exampleTitle,
  exampleItems,
  levelOptions,
  onChangeTitle,
  onUpdateLanguage,
  onAddLanguage,
  onRemoveLanguage,
}: LanguagesSectionProps) {
  return (
    <SectionCard
      title={t.languages}
      actions={
        <button type="button" className="button--small button--with-icon" onClick={onAddLanguage}>
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addLanguage}</span>
        </button>
      }
    >
      <div className="field-grid">
        <Field
          label={t.sectionTitle}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>

      <div className="stack">
        {items.map((item, index) => (
          <div key={`language-${index}`} className="task-row task-row--language">
            <Field
              label={t.languageName}
              value={item.name}
              onChange={(value) => onUpdateLanguage(index, "name", value)}
              autoClearValue={exampleItems[index]?.name ?? ""}
            />
            <SelectField
              label={t.languageLevel}
              value={item.level}
              options={levelOptions}
              placeholder={t.levelPlaceholder}
              onChange={(value) => onUpdateLanguage(index, "level", value)}
            />
            <IconButton icon={Trash2} label={t.deleteLanguage} onClick={() => onRemoveLanguage(index)} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

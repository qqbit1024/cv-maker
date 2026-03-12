import type { CSSProperties } from "react";
import { Plus, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import SelectField from "./SelectField";
import type { UIText } from "../i18n/uiText";

interface SkillsSectionProps {
  t: UIText;
  title: string;
  items: string[];
  columns: number;
  exampleTitle: string;
  exampleItems: string[];
  onChangeTitle: (value: string) => void;
  onUpdateSkill: (index: number, value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onChangeColumns: (value: number) => void;
}

export default function SkillsSection({
  t,
  title,
  items,
  columns,
  exampleTitle,
  exampleItems,
  onChangeTitle,
  onUpdateSkill,
  onAddSkill,
  onRemoveSkill,
  onChangeColumns,
}: SkillsSectionProps) {
  const normalizedItems = items.length ? items : [""];
  const gridStyle = {
    "--skills-columns": columns,
  } as CSSProperties;

  return (
    <SectionCard
      title={t.skills}
      description={t.skillsDescription}
      actions={
        <button type="button" className="button--small button--with-icon" onClick={onAddSkill}>
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addSkill}</span>
        </button>
      }
    >
      <div className="field-grid section-title-block">
        <Field
          label={t.sectionTitle}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>

      <div className="field-grid section-title-block">
        <SelectField
          label={t.skillsColumns}
          value={String(columns)}
          options={["3", "4", "5", "6"]}
          placeholder="5"
          onChange={(value) => onChangeColumns(Number(value))}
        />
      </div>

      <div className="skills-grid" style={gridStyle}>
        {normalizedItems.map((value, index) => (
          <article key={`skill-item-${index}`} className="skills-grid__item">
            <span className="skills-grid__index">{index + 1}.</span>
            <div className="skills-grid__field">
              <Field
                label=""
                value={value}
                onChange={(nextValue) => onUpdateSkill(index, nextValue)}
                autoClearValue={exampleItems[index] ?? ""}
              />
              <IconButton
                icon={Trash2}
                label={t.deleteEntry}
                tone="ghost"
                className="skills-grid__delete"
                onClick={() => onRemoveSkill(index)}
              />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import type { UIText } from "../i18n/uiText";

interface SkillsSectionProps {
  t: UIText;
  title: string;
  columns: string[][];
  exampleTitle: string;
  exampleColumns: string[][];
  onChangeTitle: (value: string) => void;
  onUpdateSkill: (rowIndex: number, columnIndex: number, value: string) => void;
  onAddRow: () => void;
  onRemoveEmptyRow: () => void;
}

function SkillMatrixInput({
  value,
  exampleValue,
  ariaLabel,
  placeholder,
  onChange,
}: {
  value: string;
  exampleValue: string;
  ariaLabel: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const shouldRestoreAutoClearValueRef = useRef(false);

  return (
    <input
      className="field__control skills-matrix__input"
      value={value}
      aria-label={ariaLabel}
      placeholder={placeholder}
      onFocus={() => {
        if (!value || !exampleValue || value !== exampleValue) {
          shouldRestoreAutoClearValueRef.current = false;
          return;
        }

        shouldRestoreAutoClearValueRef.current = true;
        onChange("");
      }}
      onBlur={() => {
        if (!shouldRestoreAutoClearValueRef.current) {
          return;
        }

        shouldRestoreAutoClearValueRef.current = false;

        if (String(value ?? "").trim() || !exampleValue) {
          return;
        }

        onChange(exampleValue);
      }}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default function SkillsSection({
  t,
  title,
  columns,
  exampleTitle,
  exampleColumns,
  onChangeTitle,
  onUpdateSkill,
  onAddRow,
  onRemoveEmptyRow,
}: SkillsSectionProps) {
  const normalizedColumns = Array.from(
    { length: Math.max(columns.length, 5) },
    (_, index) => columns[index] ?? []
  );
  const normalizedExampleColumns = Array.from(
    { length: Math.max(exampleColumns.length, 5) },
    (_, index) => exampleColumns[index] ?? []
  );
  const rowCount = Math.max(1, ...normalizedColumns.map((column) => column.length));
  const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    normalizedColumns.map((column) => column[rowIndex] ?? "")
  );
  const canRemoveEmptyRow =
    rowCount > 1 &&
    rows[rowCount - 1].every((value) => !String(value ?? "").trim());

  return (
    <SectionCard
      title={t.skills}
      actions={
        <>
          <button type="button" className="button--small button--with-icon" onClick={onAddRow}>
            <Plus className="button__icon" strokeWidth={2} />
            <span>{t.addSkillRow}</span>
          </button>
          <IconButton
            icon={Trash2}
            label={t.removeEmptySkillRow}
            tone="ghost"
            onClick={onRemoveEmptyRow}
            disabled={!canRemoveEmptyRow}
          />
        </>
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

      <div className="skills-matrix">
        {rows.map((row, rowIndex) => (
          <div key={`skills-row-${rowIndex}`} className="skills-matrix__row">
            {row.map((value, columnIndex) => (
              <SkillMatrixInput
                key={`skills-cell-${rowIndex}-${columnIndex}`}
                value={value}
                exampleValue={normalizedExampleColumns[columnIndex]?.[rowIndex] ?? ""}
                ariaLabel={t.skillCell(rowIndex * normalizedColumns.length + columnIndex)}
                placeholder={t.skillCell(rowIndex * normalizedColumns.length + columnIndex)}
                onChange={(nextValue) => onUpdateSkill(rowIndex, columnIndex, nextValue)}
              />
            ))}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

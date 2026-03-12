import { ChevronDown, ChevronUp, EyeOff, Plus, RotateCcw, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import type { CourseEntry } from "../types/resume";
import type { UIText } from "../i18n/uiText";

interface EntriesSectionProps {
  t: UIText;
  panelTitle: string;
  title: string;
  exampleTitle: string;
  entryLabel: (index: number) => string;
  addVisibleLabel: string;
  addHiddenLabel: string;
  hiddenTitle: string;
  hiddenHelp: string;
  hiddenDeleteLabel: string;
  visibleEntries: CourseEntry[];
  hiddenEntries: CourseEntry[];
  exampleVisibleEntries: CourseEntry[];
  exampleHiddenEntries: CourseEntry[];
  onChangeTitle: (value: string) => void;
  onUpdateEntry: (collectionKey: "entries" | "_commentedEntries" | "items" | "_commentedItems", index: number, value: string) => void;
  onAddEntry: (collectionKey?: "entries" | "_commentedEntries" | "items" | "_commentedItems") => void;
  onRemoveEntry: (collectionKey: "entries" | "_commentedEntries" | "items" | "_commentedItems", index: number) => void;
  onMoveEntry: (index: number, direction: "up" | "down") => void;
  onHideEntry: (index: number) => void;
  onRestoreEntry: (index: number) => void;
  visibleCollectionKey: "entries" | "items";
  hiddenCollectionKey: "_commentedEntries" | "_commentedItems";
}

function EntryCard({
  t,
  entryLabel,
  entry,
  exampleEntry,
  index,
  collectionKey,
  isHidden,
  hiddenDeleteLabel,
  onUpdateEntry,
  onRemoveEntry,
  onMoveEntry,
  onHideEntry,
  onRestoreEntry,
}: {
  t: UIText;
  entryLabel: (index: number) => string;
  entry: CourseEntry;
  exampleEntry?: CourseEntry;
  index: number;
  collectionKey: "entries" | "_commentedEntries" | "items" | "_commentedItems";
  isHidden: boolean;
  hiddenDeleteLabel: string;
  onUpdateEntry: (collectionKey: "entries" | "_commentedEntries" | "items" | "_commentedItems", index: number, value: string) => void;
  onRemoveEntry: (collectionKey: "entries" | "_commentedEntries" | "items" | "_commentedItems", index: number) => void;
  onMoveEntry: (index: number, direction: "up" | "down") => void;
  onHideEntry: (index: number) => void;
  onRestoreEntry: (index: number) => void;
}) {
  return (
    <article className={`job-card${isHidden ? " job-card--hidden" : ""}`}>
      <div className="job-card__header">
        <h3>{entryLabel(index)}</h3>
        <div className="job-card__actions">
          {!isHidden ? (
            <>
              <IconButton icon={ChevronUp} label={t.moveUp} onClick={() => onMoveEntry(index, "up")} />
              <IconButton
                icon={ChevronDown}
                label={t.moveDown}
                onClick={() => onMoveEntry(index, "down")}
              />
              <IconButton icon={EyeOff} label={t.hideEntry} onClick={() => onHideEntry(index)} />
            </>
          ) : (
            <IconButton icon={RotateCcw} label={t.restoreEntry} onClick={() => onRestoreEntry(index)} />
          )}
          <IconButton
            icon={Trash2}
            label={isHidden ? hiddenDeleteLabel : t.deleteEntry}
            tone="ghost"
            onClick={() => onRemoveEntry(collectionKey, index)}
          />
        </div>
      </div>

      <Field
        label={entryLabel(index)}
        value={entry.course}
        onChange={(value) => onUpdateEntry(collectionKey, index, value)}
        autoClearValue={exampleEntry?.course ?? ""}
      />
    </article>
  );
}

export default function EntriesSection({
  t,
  panelTitle,
  title,
  exampleTitle,
  entryLabel,
  addVisibleLabel,
  addHiddenLabel,
  hiddenTitle,
  hiddenHelp,
  hiddenDeleteLabel,
  visibleEntries,
  hiddenEntries,
  exampleVisibleEntries,
  exampleHiddenEntries,
  onChangeTitle,
  onUpdateEntry,
  onAddEntry,
  onRemoveEntry,
  onMoveEntry,
  onHideEntry,
  onRestoreEntry,
  visibleCollectionKey,
  hiddenCollectionKey,
}: EntriesSectionProps) {
  return (
    <SectionCard
      title={panelTitle}
      actions={
        <button
          type="button"
          className="button--small button--with-icon"
          onClick={() => onAddEntry(visibleCollectionKey)}
        >
          <Plus className="button__icon" strokeWidth={2} />
          <span>{addVisibleLabel}</span>
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
        {visibleEntries.map((entry, index) => (
          <EntryCard
            key={`entry-${visibleCollectionKey}-${index}`}
            t={t}
            entryLabel={entryLabel}
            entry={entry}
            exampleEntry={exampleVisibleEntries[index]}
            index={index}
            collectionKey={visibleCollectionKey}
            isHidden={false}
            hiddenDeleteLabel={hiddenDeleteLabel}
            onUpdateEntry={onUpdateEntry}
            onRemoveEntry={onRemoveEntry}
            onMoveEntry={onMoveEntry}
            onHideEntry={onHideEntry}
            onRestoreEntry={onRestoreEntry}
          />
        ))}
      </div>

      <div className="subsection-header">
        <div>
          <h3>{hiddenTitle}</h3>
          <p>{hiddenHelp}</p>
        </div>
        <button
          type="button"
          className="button--small button--with-icon"
          onClick={() => onAddEntry(hiddenCollectionKey)}
        >
          <Plus className="button__icon" strokeWidth={2} />
          <span>{addHiddenLabel}</span>
        </button>
      </div>

      <div className="stack">
        {hiddenEntries.map((entry, index) => (
          <EntryCard
            key={`entry-${hiddenCollectionKey}-${index}`}
            t={t}
            entryLabel={entryLabel}
            entry={entry}
            exampleEntry={exampleHiddenEntries[index]}
            index={index}
            collectionKey={hiddenCollectionKey}
            isHidden
            hiddenDeleteLabel={hiddenDeleteLabel}
            onUpdateEntry={onUpdateEntry}
            onRemoveEntry={onRemoveEntry}
            onMoveEntry={onMoveEntry}
            onHideEntry={onHideEntry}
            onRestoreEntry={onRestoreEntry}
          />
        ))}
      </div>
    </SectionCard>
  );
}

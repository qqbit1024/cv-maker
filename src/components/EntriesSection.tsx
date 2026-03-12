import { useState, type ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EyeOff, GripVertical, Plus, RotateCcw, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import type { CourseEntry } from "../types/resume";
import type { UIText } from "../i18n/uiText";

type EntryCollectionKey = "entries" | "_commentedEntries" | "items" | "_commentedItems";

interface EntriesSectionProps {
  t: UIText;
  panelTitle: string;
  description: string;
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
  onUpdateEntry: (collectionKey: EntryCollectionKey, index: number, value: string) => void;
  onAddEntry: (collectionKey?: EntryCollectionKey) => void;
  onRemoveEntry: (collectionKey: EntryCollectionKey, index: number) => void;
  onReorderEntry: (collectionKey: EntryCollectionKey, fromIndex: number, toIndex: number) => void;
  onHideEntry: (index: number) => void;
  onRestoreEntry: (index: number) => void;
  visibleCollectionKey: "entries" | "items";
  hiddenCollectionKey: "_commentedEntries" | "_commentedItems";
}

function EntryRow({
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
  onHideEntry,
  onRestoreEntry,
  dragHandle,
  isDragging,
}: {
  t: UIText;
  entryLabel: (index: number) => string;
  entry: CourseEntry;
  exampleEntry?: CourseEntry;
  index: number;
  collectionKey: EntryCollectionKey;
  isHidden: boolean;
  hiddenDeleteLabel: string;
  onUpdateEntry: (collectionKey: EntryCollectionKey, index: number, value: string) => void;
  onRemoveEntry: (collectionKey: EntryCollectionKey, index: number) => void;
  onHideEntry: (index: number) => void;
  onRestoreEntry: (index: number) => void;
  dragHandle?: ReactNode;
  isDragging?: boolean;
}) {
  return (
    <article
      className={`entry-row-card${isHidden ? " entry-row-card--hidden" : ""}${
        isDragging ? " entry-row-card--dragging" : ""
      }`}
    >
      <span className="entry-row-card__index">{entryLabel(index)}</span>
      <Field
        label=""
        value={entry.course}
        onChange={(value) => onUpdateEntry(collectionKey, index, value)}
        autoClearValue={exampleEntry?.course ?? ""}
      />
      <div className="entry-row-card__actions">
        {dragHandle}
        {!isHidden ? (
          <IconButton icon={EyeOff} label={t.hideEntry} onClick={() => onHideEntry(index)} />
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
    </article>
  );
}

function SortableEntryRow(
  props: Omit<Parameters<typeof EntryRow>[0], "dragHandle" | "isDragging"> & {
    sortableId: number;
  }
) {
  const { sortableId, t, ...entryRowProps } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: sortableId,
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`entry-row-sortable${isDragging ? " entry-row-sortable--dragging" : ""}`}
    >
      <EntryRow
        {...entryRowProps}
        t={t}
        isDragging={isDragging}
        dragHandle={
          <button
            type="button"
            className="entry-row-card__drag-handle"
            aria-label={t.dragToReorder}
            title={t.dragToReorder}
            {...attributes}
            {...listeners}
          >
            <GripVertical strokeWidth={2} />
          </button>
        }
      />
    </div>
  );
}

export default function EntriesSection({
  t,
  panelTitle,
  description,
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
  onReorderEntry,
  onHideEntry,
  onRestoreEntry,
  visibleCollectionKey,
  hiddenCollectionKey,
}: EntriesSectionProps) {
  const [activeVisibleDragIndex, setActiveVisibleDragIndex] = useState<number | null>(null);
  const [activeHiddenDragIndex, setActiveHiddenDragIndex] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleVisibleDragStart = ({ active }: DragStartEvent) => {
    const index = Number(active.id);

    if (!Number.isNaN(index)) {
      setActiveVisibleDragIndex(index);
    }
  };

  const handleVisibleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveVisibleDragIndex(null);

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = Number(active.id);
    const toIndex = Number(over.id);

    if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
      return;
    }

    onReorderEntry(visibleCollectionKey, fromIndex, toIndex);
  };

  const handleHiddenDragStart = ({ active }: DragStartEvent) => {
    const index = Number(active.id);

    if (!Number.isNaN(index)) {
      setActiveHiddenDragIndex(index);
    }
  };

  const handleHiddenDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveHiddenDragIndex(null);

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = Number(active.id);
    const toIndex = Number(over.id);

    if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
      return;
    }

    onReorderEntry(hiddenCollectionKey, fromIndex, toIndex);
  };

  const canReorderVisibleEntries = visibleEntries.length > 1;
  const canReorderHiddenEntries = hiddenEntries.length > 1;
  const activeVisibleDragEntry =
    activeVisibleDragIndex !== null ? visibleEntries[activeVisibleDragIndex] : undefined;
  const activeHiddenDragEntry =
    activeHiddenDragIndex !== null ? hiddenEntries[activeHiddenDragIndex] : undefined;

  return (
    <SectionCard
      title={panelTitle}
      description={description}
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
      <div className="field-grid section-title-block">
        <Field
          label={t.sectionTitle}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>

      {canReorderVisibleEntries ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleVisibleDragStart}
          onDragEnd={handleVisibleDragEnd}
          onDragCancel={() => setActiveVisibleDragIndex(null)}
        >
          <SortableContext
            items={visibleEntries.map((_, index) => index)}
            strategy={verticalListSortingStrategy}
          >
            <div className="stack">
              {visibleEntries.map((entry, index) => (
                <SortableEntryRow
                  key={`entry-${visibleCollectionKey}-${index}`}
                  sortableId={index}
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
                  onHideEntry={onHideEntry}
                  onRestoreEntry={onRestoreEntry}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay zIndex={120}>
            {activeVisibleDragEntry ? (
              <div className="drag-overlay">
                <EntryRow
                  t={t}
                  entryLabel={entryLabel}
                  entry={activeVisibleDragEntry}
                  exampleEntry={exampleVisibleEntries[activeVisibleDragIndex ?? 0]}
                  index={activeVisibleDragIndex ?? 0}
                  collectionKey={visibleCollectionKey}
                  isHidden={false}
                  hiddenDeleteLabel={hiddenDeleteLabel}
                  onUpdateEntry={onUpdateEntry}
                  onRemoveEntry={onRemoveEntry}
                  onHideEntry={onHideEntry}
                  onRestoreEntry={onRestoreEntry}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="stack">
          {visibleEntries.map((entry, index) => (
            <EntryRow
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
              onHideEntry={onHideEntry}
              onRestoreEntry={onRestoreEntry}
            />
          ))}
        </div>
      )}

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

      {canReorderHiddenEntries ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleHiddenDragStart}
          onDragEnd={handleHiddenDragEnd}
          onDragCancel={() => setActiveHiddenDragIndex(null)}
        >
          <SortableContext
            items={hiddenEntries.map((_, index) => index)}
            strategy={verticalListSortingStrategy}
          >
            <div className="stack">
              {hiddenEntries.map((entry, index) => (
                <SortableEntryRow
                  key={`entry-${hiddenCollectionKey}-${index}`}
                  sortableId={index}
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
                  onHideEntry={onHideEntry}
                  onRestoreEntry={onRestoreEntry}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay zIndex={120}>
            {activeHiddenDragEntry ? (
              <div className="drag-overlay">
                <EntryRow
                  t={t}
                  entryLabel={entryLabel}
                  entry={activeHiddenDragEntry}
                  exampleEntry={exampleHiddenEntries[activeHiddenDragIndex ?? 0]}
                  index={activeHiddenDragIndex ?? 0}
                  collectionKey={hiddenCollectionKey}
                  isHidden
                  hiddenDeleteLabel={hiddenDeleteLabel}
                  onUpdateEntry={onUpdateEntry}
                  onRemoveEntry={onRemoveEntry}
                  onHideEntry={onHideEntry}
                  onRestoreEntry={onRestoreEntry}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="stack">
          {hiddenEntries.map((entry, index) => (
            <EntryRow
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
              onHideEntry={onHideEntry}
              onRestoreEntry={onRestoreEntry}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

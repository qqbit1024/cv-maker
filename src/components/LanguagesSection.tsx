import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
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
  onReorderLanguages: (fromIndex: number, toIndex: number) => void;
}

function LanguageRow({
  t,
  item,
  exampleItem,
  index,
  levelOptions,
  onUpdateLanguage,
  onRemoveLanguage,
  dragHandle,
  isDragging,
}: {
  t: UIText;
  item: LanguageItem;
  exampleItem?: LanguageItem;
  index: number;
  levelOptions: string[];
  onUpdateLanguage: (index: number, field: "name" | "level", value: string) => void;
  onRemoveLanguage: (index: number) => void;
  dragHandle?: ReactNode;
  isDragging?: boolean;
}) {
  return (
    <article className={`language-row-card${isDragging ? " language-row-card--dragging" : ""}`}>
      <span className="language-row-card__index">{index + 1}.</span>
      <Field
        label=""
        value={item.name}
        onChange={(value) => onUpdateLanguage(index, "name", value)}
        autoClearValue={exampleItem?.name ?? ""}
      />
      <SelectField
        label=""
        value={item.level}
        options={levelOptions}
        placeholder={t.levelPlaceholder}
        onChange={(value) => onUpdateLanguage(index, "level", value)}
      />
      <div className="language-row-card__actions">
        {dragHandle}
        <IconButton icon={Trash2} label={t.deleteLanguage} onClick={() => onRemoveLanguage(index)} />
      </div>
    </article>
  );
}

function SortableLanguageRow({
  t,
  item,
  exampleItem,
  index,
  levelOptions,
  onUpdateLanguage,
  onRemoveLanguage,
}: {
  t: UIText;
  item: LanguageItem;
  exampleItem?: LanguageItem;
  index: number;
  levelOptions: string[];
  onUpdateLanguage: (index: number, field: "name" | "level", value: string) => void;
  onRemoveLanguage: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: index,
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`language-row-sortable${isDragging ? " language-row-sortable--dragging" : ""}`}
      data-id={`language-${index}`}
    >
      <LanguageRow
        t={t}
        item={item}
        exampleItem={exampleItem}
        index={index}
        levelOptions={levelOptions}
        onUpdateLanguage={onUpdateLanguage}
        onRemoveLanguage={onRemoveLanguage}
        isDragging={isDragging}
        dragHandle={
          <button
            type="button"
            className="language-row-card__drag-handle"
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
  onReorderLanguages,
}: LanguagesSectionProps) {
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const [dragNodeWidth, setDragNodeWidth] = useState<number | null>(null);

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

  const handleDragStart = ({ active }: DragStartEvent) => {
    const index = Number(active.id);

    if (!Number.isNaN(index)) {
      setActiveDragIndex(index);
      const node = document.querySelector(`[data-id="language-${index}"]`);
      if (node) {
        setDragNodeWidth(node.getBoundingClientRect().width);
      }
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveDragIndex(null);
    setDragNodeWidth(null);

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = Number(active.id);
    const toIndex = Number(over.id);

    if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
      return;
    }

    onReorderLanguages(fromIndex, toIndex);
  };

  const canReorderLanguages = items.length > 1;
  const activeDragLanguage = activeDragIndex !== null ? items[activeDragIndex] : undefined;

  return (
    <SectionCard
      title={t.languages}
      description={t.languagesDescription}
      actions={
        <button type="button" className="button--small button--with-icon" onClick={onAddLanguage}>
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addLanguage}</span>
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

      {canReorderLanguages ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActiveDragIndex(null);
            setDragNodeWidth(null);
          }}
        >
          <SortableContext items={items.map((_, index) => index)} strategy={verticalListSortingStrategy}>
            <div className="stack">
              {items.map((item, index) => (
                <SortableLanguageRow
                  key={`language-${index}`}
                  t={t}
                  item={item}
                  exampleItem={exampleItems[index]}
                  index={index}
                  levelOptions={levelOptions}
                  onUpdateLanguage={onUpdateLanguage}
                  onRemoveLanguage={onRemoveLanguage}
                />
              ))}
            </div>
          </SortableContext>
          {typeof document !== "undefined"
            ? createPortal(
                <DragOverlay zIndex={120}>
                  {activeDragLanguage ? (
                    <div
                      className="drag-overlay"
                      style={{ width: dragNodeWidth ? `${dragNodeWidth}px` : undefined }}
                    >
                      <LanguageRow
                        t={t}
                        item={activeDragLanguage}
                        exampleItem={exampleItems[activeDragIndex ?? 0]}
                        index={activeDragIndex ?? 0}
                        levelOptions={levelOptions}
                        onUpdateLanguage={() => {}}
                        onRemoveLanguage={() => {}}
                        isDragging
                        dragHandle={
                          <button
                            type="button"
                            className="language-row-card__drag-handle"
                            disabled
                          >
                            <GripVertical strokeWidth={2} />
                          </button>
                        }
                      />
                    </div>
                  ) : null}
                </DragOverlay>,
                document.body
              )
            : null}
        </DndContext>
      ) : (
        <div className="stack">
          {items.map((item, index) => (
            <LanguageRow
              key={`language-${index}`}
              t={t}
              item={item}
              exampleItem={exampleItems[index]}
              index={index}
              levelOptions={levelOptions}
              onUpdateLanguage={onUpdateLanguage}
              onRemoveLanguage={onRemoveLanguage}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

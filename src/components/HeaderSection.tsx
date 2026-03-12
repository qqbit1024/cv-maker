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
import { GripVertical, Plus, Trash2 } from "lucide-react";
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
  onReorderContacts: (fromIndex: number, toIndex: number) => void;
}

function ContactRow({
  t,
  value,
  exampleValue,
  index,
  onChange,
  onRemove,
  dragHandle,
  isDragging,
}: {
  t: UIText;
  value: string;
  exampleValue?: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  dragHandle?: ReactNode;
  isDragging?: boolean;
}) {
  return (
    <article className={`entry-row-card${isDragging ? " entry-row-card--dragging" : ""}`}>
      <span className="entry-row-card__index">{index + 1}.</span>
      <Field label="" value={value} onChange={onChange} autoClearValue={exampleValue ?? ""} />
      <div className="entry-row-card__actions">
        {dragHandle}
        <IconButton icon={Trash2} label={t.deleteContact} onClick={onRemove} />
      </div>
    </article>
  );
}

function SortableContactRow({
  t,
  value,
  exampleValue,
  index,
  onChange,
  onRemove,
}: {
  t: UIText;
  value: string;
  exampleValue?: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
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
      className={`entry-row-sortable${isDragging ? " entry-row-sortable--dragging" : ""}`}
    >
      <ContactRow
        t={t}
        value={value}
        exampleValue={exampleValue}
        index={index}
        onChange={onChange}
        onRemove={onRemove}
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
  onReorderContacts,
}: HeaderSectionProps) {
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
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

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveDragIndex(null);

    if (!over || active.id === over.id) {
      return;
    }

    const fromIndex = Number(active.id);
    const toIndex = Number(over.id);

    if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
      return;
    }

    onReorderContacts(fromIndex, toIndex);
  };

  const canReorderContacts = contacts.length > 1;
  const activeDragContact = activeDragIndex !== null ? contacts[activeDragIndex] : undefined;

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

      {canReorderContacts ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={({ active }: DragStartEvent) => {
            const index = Number(active.id);

            if (!Number.isNaN(index)) {
              setActiveDragIndex(index);
            }
          }}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveDragIndex(null)}
        >
          <SortableContext items={contacts.map((_, index) => index)} strategy={verticalListSortingStrategy}>
            <div className="stack">
              {contacts.map((contact, index) => (
                <SortableContactRow
                  key={`contact-${index}`}
                  t={t}
                  value={contact}
                  exampleValue={exampleContacts[index]}
                  index={index}
                  onChange={(value) => onChangeContact(index, value)}
                  onRemove={() => onRemoveContact(index)}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay zIndex={120}>
            {activeDragContact ? (
              <div className="drag-overlay">
                <ContactRow
                  t={t}
                  value={activeDragContact}
                  exampleValue={exampleContacts[activeDragIndex ?? 0]}
                  index={activeDragIndex ?? 0}
                  onChange={() => {}}
                  onRemove={() => {}}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="stack">
          {contacts.map((contact, index) => (
            <ContactRow
              key={`contact-${index}`}
              t={t}
              value={contact}
              exampleValue={exampleContacts[index]}
              index={index}
              onChange={(value) => onChangeContact(index, value)}
              onRemove={() => onRemoveContact(index)}
            />
          ))}
        </div>
      )}

      <div className="job-card__footer">
        <button type="button" className="button--small button--with-icon" onClick={onAddContact}>
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addContact}</span>
        </button>
      </div>
    </SectionCard>
  );
}

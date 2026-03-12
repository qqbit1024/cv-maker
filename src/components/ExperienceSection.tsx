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
import { ChevronDown, EyeOff, GripVertical, Plus, RotateCcw, Trash2 } from "lucide-react";
import Field from "./Field";
import IconButton from "./IconButton";
import SectionCard from "./SectionCard";
import type { UIText } from "../i18n/uiText";
import type { Job, JobTask } from "../types/resume";

interface ExperienceSectionProps {
  t: UIText;
  title: string;
  jobs: Job[];
  hiddenJobs: Job[];
  exampleTitle: string;
  exampleJobs: Job[];
  exampleHiddenJobs: Job[];
  onChangeTitle: (value: string) => void;
  onAddJob: (collectionKey?: "jobs" | "_commentedJobs") => void;
  onReorderJobs: (collectionKey: "jobs" | "_commentedJobs", fromIndex: number, toIndex: number) => void;
  onHideJob: (index: number) => void;
  onRestoreJob: (index: number) => void;
  onRemoveJob: (collectionKey: "jobs" | "_commentedJobs", index: number) => void;
  onUpdateJobField: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    field: "title" | "company" | "period",
    value: string
  ) => void;
  onUpdateTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    taskIndex: number,
    value: string
  ) => void;
  onAddTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey?: "tasks" | "_commentedTasks"
  ) => void;
  onRemoveTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    taskIndex: number
  ) => void;
  onReorderTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    fromIndex: number,
    toIndex: number
  ) => void;
  onHideTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onRestoreTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onUpdateNotes: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, value: string) => void;
}

function TaskRow({
  t,
  task,
  exampleTask,
  index,
  isHidden,
  onUpdateTask,
  onRemoveTask,
  onHideTask,
  onRestoreTask,
  dragHandle,
  isDragging,
}: {
  t: UIText;
  task: JobTask;
  exampleTask?: JobTask;
  index: number;
  isHidden: boolean;
  onUpdateTask: (value: string) => void;
  onRemoveTask: () => void;
  onHideTask: () => void;
  onRestoreTask: () => void;
  dragHandle?: ReactNode;
  isDragging?: boolean;
}) {
  return (
    <article className={`task-row-card${isDragging ? " task-row-card--dragging" : ""}`}>
      <span className="task-row-card__index">{t.bullet(index)}</span>
      <Field
        label=""
        value={task.text}
        onChange={onUpdateTask}
        autoClearValue={exampleTask?.text ?? ""}
        multiline
        rows={1}
      />
      <div className="task-row-card__actions">
        {dragHandle}
        {!isHidden ? (
          <IconButton icon={EyeOff} label={t.hideBullet} onClick={onHideTask} />
        ) : (
          <IconButton icon={RotateCcw} label={t.restoreBullet} onClick={onRestoreTask} />
        )}
        <IconButton
          icon={Trash2}
          label={isHidden ? t.deleteHiddenBullet : t.deleteBullet}
          tone="ghost"
          onClick={onRemoveTask}
        />
      </div>
    </article>
  );
}

function SortableTaskRow({
  sortableId,
  t,
  task,
  exampleTask,
  index,
  isHidden,
  onUpdateTask,
  onRemoveTask,
  onHideTask,
  onRestoreTask,
}: {
  sortableId: number;
  t: UIText;
  task: JobTask;
  exampleTask?: JobTask;
  index: number;
  isHidden: boolean;
  onUpdateTask: (value: string) => void;
  onRemoveTask: () => void;
  onHideTask: () => void;
  onRestoreTask: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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
      <TaskRow
        t={t}
        task={task}
        exampleTask={exampleTask}
        index={index}
        isHidden={isHidden}
        onUpdateTask={onUpdateTask}
        onRemoveTask={onRemoveTask}
        onHideTask={onHideTask}
        onRestoreTask={onRestoreTask}
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

function JobCard({
  t,
  job,
  exampleJob,
  index,
  collectionKey,
  isHidden,
  onHideJob,
  onRestoreJob,
  onRemoveJob,
  onUpdateJobField,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
  onReorderTask,
  onHideTask,
  onRestoreTask,
  onUpdateNotes,
  isCollapsed,
  onToggleCollapsed,
  dragHandle,
  isDragging,
}: {
  t: UIText;
  job: Job;
  exampleJob?: Job;
  index: number;
  collectionKey: "jobs" | "_commentedJobs";
  isHidden: boolean;
  onHideJob: (index: number) => void;
  onRestoreJob: (index: number) => void;
  onRemoveJob: (collectionKey: "jobs" | "_commentedJobs", index: number) => void;
  onUpdateJobField: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    field: "title" | "company" | "period",
    value: string
  ) => void;
  onUpdateTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    taskIndex: number,
    value: string
  ) => void;
  onAddTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey?: "tasks" | "_commentedTasks"
  ) => void;
  onRemoveTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    taskIndex: number
  ) => void;
  onReorderTask: (
    collectionKey: "jobs" | "_commentedJobs",
    jobIndex: number,
    taskCollectionKey: "tasks" | "_commentedTasks",
    fromIndex: number,
    toIndex: number
  ) => void;
  onHideTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onRestoreTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onUpdateNotes: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, value: string) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  dragHandle?: ReactNode;
  isDragging?: boolean;
}) {
  const [activeVisibleTaskDragIndex, setActiveVisibleTaskDragIndex] = useState<number | null>(null);
  const [activeHiddenTaskDragIndex, setActiveHiddenTaskDragIndex] = useState<number | null>(null);
  const taskSensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const visibleTasks = job.tasks.filter((task) => !task.hidden);
  const hiddenTasks = job.tasks.filter((task) => task.hidden);
  const exampleVisibleTasks = (exampleJob?.tasks ?? []).filter((task) => !task.hidden);
  const exampleHiddenTasks = (exampleJob?.tasks ?? []).filter((task) => task.hidden);
  const companyLabel = job.company.trim();
  const titleLabel = job.title.trim();
  const periodLabel = job.period.trim();
  const headerLabel = `${t.job(index)}${companyLabel ? ` (${companyLabel})` : ""}${
    isHidden ? ` · ${t.hiddenBadge}` : ""
  }`;
  const metaLabel = [titleLabel, periodLabel].filter(Boolean).join(" · ");
  const canReorderVisibleTasks = visibleTasks.length > 1;
  const canReorderHiddenTasks = hiddenTasks.length > 1;
  const activeVisibleTask = activeVisibleTaskDragIndex !== null ? visibleTasks[activeVisibleTaskDragIndex] : undefined;
  const activeHiddenTask = activeHiddenTaskDragIndex !== null ? hiddenTasks[activeHiddenTaskDragIndex] : undefined;

  return (
    <article
      className={`job-card${isHidden ? " job-card--hidden" : ""}${isCollapsed ? " job-card--collapsed" : ""}${
        isDragging ? " job-card--dragging" : ""
      }`}
    >
      <div className="job-card__header">
        <button type="button" className="job-card__toggle" onClick={onToggleCollapsed}>
          <span
            className={`job-card__toggle-icon${!isCollapsed ? " job-card__toggle-icon--expanded" : ""}`}
            aria-hidden="true"
          >
            <ChevronDown strokeWidth={2} />
          </span>
          <span className="job-card__title-wrap">
            <h3>{headerLabel}</h3>
            {metaLabel ? <span className="job-card__meta">{metaLabel}</span> : null}
          </span>
        </button>
        <div className="job-card__actions">
          {dragHandle}
          {!isHidden ? (
            <>
              <IconButton icon={EyeOff} label={t.hideJob} onClick={() => onHideJob(index)} />
            </>
          ) : (
            <IconButton icon={RotateCcw} label={t.restoreJob} onClick={() => onRestoreJob(index)} />
          )}
          <IconButton
            icon={Trash2}
            label={isHidden ? t.deleteHiddenJob : t.removeJob}
            tone="ghost"
            onClick={() => onRemoveJob(collectionKey, index)}
          />
        </div>
      </div>

      {!isCollapsed ? (
        <>
          <div className="field-grid--triple field-grid">
            <Field
              label={t.title}
              value={job.title}
              onChange={(value) => onUpdateJobField(collectionKey, index, "title", value)}
              autoClearValue={exampleJob?.title ?? ""}
            />
            <Field
              label={t.company}
              value={job.company}
              onChange={(value) => onUpdateJobField(collectionKey, index, "company", value)}
              autoClearValue={exampleJob?.company ?? ""}
            />
            <Field
              label={t.period}
              value={job.period}
              onChange={(value) => onUpdateJobField(collectionKey, index, "period", value)}
              autoClearValue={exampleJob?.period ?? ""}
            />
          </div>

          {canReorderVisibleTasks ? (
            <DndContext
              sensors={taskSensors}
              collisionDetection={closestCenter}
              onDragStart={({ active }: DragStartEvent) => {
                const taskIndex = Number(active.id);

                if (!Number.isNaN(taskIndex)) {
                  setActiveVisibleTaskDragIndex(taskIndex);
                }
              }}
              onDragEnd={({ active, over }: DragEndEvent) => {
                setActiveVisibleTaskDragIndex(null);

                if (!over || active.id === over.id) {
                  return;
                }

                const fromIndex = Number(active.id);
                const toIndex = Number(over.id);

                if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
                  return;
                }

                onReorderTask(collectionKey, index, "tasks", fromIndex, toIndex);
              }}
              onDragCancel={() => setActiveVisibleTaskDragIndex(null)}
            >
              <SortableContext
                items={visibleTasks.map((_, taskIndex) => taskIndex)}
                strategy={verticalListSortingStrategy}
              >
                <div className="stack">
                  {visibleTasks.map((task: JobTask, taskIndex) => (
                    <SortableTaskRow
                      key={`${collectionKey}-${index}-task-${taskIndex}`}
                      sortableId={taskIndex}
                      t={t}
                      task={task}
                      exampleTask={exampleVisibleTasks[taskIndex]}
                      index={taskIndex}
                      isHidden={false}
                      onUpdateTask={(value) =>
                        onUpdateTask(collectionKey, index, "tasks", taskIndex, value)
                      }
                      onRemoveTask={() => onRemoveTask(collectionKey, index, "tasks", taskIndex)}
                      onHideTask={() => onHideTask(collectionKey, index, taskIndex)}
                      onRestoreTask={() => {}}
                    />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay zIndex={120}>
                {activeVisibleTask ? (
                  <div className="drag-overlay">
                    <TaskRow
                      t={t}
                      task={activeVisibleTask}
                      exampleTask={exampleVisibleTasks[activeVisibleTaskDragIndex ?? 0]}
                      index={activeVisibleTaskDragIndex ?? 0}
                      isHidden={false}
                      onUpdateTask={() => {}}
                      onRemoveTask={() => {}}
                      onHideTask={() => {}}
                      onRestoreTask={() => {}}
                      isDragging
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="stack">
              {visibleTasks.map((task: JobTask, taskIndex) => (
                <TaskRow
                  key={`${collectionKey}-${index}-task-${taskIndex}`}
                  t={t}
                  task={task}
                  exampleTask={exampleVisibleTasks[taskIndex]}
                  index={taskIndex}
                  isHidden={false}
                  onUpdateTask={(value) => onUpdateTask(collectionKey, index, "tasks", taskIndex, value)}
                  onRemoveTask={() => onRemoveTask(collectionKey, index, "tasks", taskIndex)}
                  onHideTask={() => onHideTask(collectionKey, index, taskIndex)}
                  onRestoreTask={() => {}}
                />
              ))}
            </div>
          )}

          <div className="job-card__footer">
            <button
              type="button"
              className="button--small button--with-icon"
              onClick={() => onAddTask(collectionKey, index, "tasks")}
            >
              <Plus className="button__icon" strokeWidth={2} />
              <span>{t.addBullet}</span>
            </button>
          </div>

          <div className="subsection-header">
            <div>
              <h3>{t.hiddenBullets}</h3>
              <p>{t.hiddenBulletsHelp}</p>
            </div>
            <button
              type="button"
              className="button--small button--with-icon"
              onClick={() => onAddTask(collectionKey, index, "_commentedTasks")}
            >
              <Plus className="button__icon" strokeWidth={2} />
              <span>{t.addHiddenBullet}</span>
            </button>
          </div>

          {canReorderHiddenTasks ? (
            <DndContext
              sensors={taskSensors}
              collisionDetection={closestCenter}
              onDragStart={({ active }: DragStartEvent) => {
                const taskIndex = Number(active.id);

                if (!Number.isNaN(taskIndex)) {
                  setActiveHiddenTaskDragIndex(taskIndex);
                }
              }}
              onDragEnd={({ active, over }: DragEndEvent) => {
                setActiveHiddenTaskDragIndex(null);

                if (!over || active.id === over.id) {
                  return;
                }

                const fromIndex = Number(active.id);
                const toIndex = Number(over.id);

                if (Number.isNaN(fromIndex) || Number.isNaN(toIndex)) {
                  return;
                }

                onReorderTask(collectionKey, index, "_commentedTasks", fromIndex, toIndex);
              }}
              onDragCancel={() => setActiveHiddenTaskDragIndex(null)}
            >
              <SortableContext
                items={hiddenTasks.map((_, taskIndex) => taskIndex)}
                strategy={verticalListSortingStrategy}
              >
                <div className="stack">
                  {hiddenTasks.map((task: JobTask, taskIndex) => (
                    <SortableTaskRow
                      key={`${collectionKey}-${index}-hidden-task-${taskIndex}`}
                      sortableId={taskIndex}
                      t={t}
                      task={task}
                      exampleTask={exampleHiddenTasks[taskIndex]}
                      index={taskIndex}
                      isHidden
                      onUpdateTask={(value) =>
                        onUpdateTask(collectionKey, index, "_commentedTasks", taskIndex, value)
                      }
                      onRemoveTask={() =>
                        onRemoveTask(collectionKey, index, "_commentedTasks", taskIndex)
                      }
                      onHideTask={() => {}}
                      onRestoreTask={() => onRestoreTask(collectionKey, index, taskIndex)}
                    />
                  ))}
                </div>
              </SortableContext>
              <DragOverlay zIndex={120}>
                {activeHiddenTask ? (
                  <div className="drag-overlay">
                    <TaskRow
                      t={t}
                      task={activeHiddenTask}
                      exampleTask={exampleHiddenTasks[activeHiddenTaskDragIndex ?? 0]}
                      index={activeHiddenTaskDragIndex ?? 0}
                      isHidden
                      onUpdateTask={() => {}}
                      onRemoveTask={() => {}}
                      onHideTask={() => {}}
                      onRestoreTask={() => {}}
                      isDragging
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <div className="stack">
              {hiddenTasks.map((task: JobTask, taskIndex) => (
                <TaskRow
                  key={`${collectionKey}-${index}-hidden-task-${taskIndex}`}
                  t={t}
                  task={task}
                  exampleTask={exampleHiddenTasks[taskIndex]}
                  index={taskIndex}
                  isHidden
                  onUpdateTask={(value) =>
                    onUpdateTask(collectionKey, index, "_commentedTasks", taskIndex, value)
                  }
                  onRemoveTask={() => onRemoveTask(collectionKey, index, "_commentedTasks", taskIndex)}
                  onHideTask={() => {}}
                  onRestoreTask={() => onRestoreTask(collectionKey, index, taskIndex)}
                />
              ))}
            </div>
          )}

          <Field
            label={t.notes}
            value={job.notes}
            onChange={(value) => onUpdateNotes(collectionKey, index, value)}
            autoClearValue={exampleJob?.notes ?? ""}
            multiline
            rows={4}
          />
        </>
      ) : null}
    </article>
  );
}

function SortableJobCard(
  props: Omit<
    Parameters<typeof JobCard>[0],
    "dragHandle" | "isDragging"
  > & { sortableId: number }
) {
  const { sortableId, t, ...jobCardProps } = props;
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
      className={`job-card-sortable${isDragging ? " job-card-sortable--dragging" : ""}`}
    >
      <JobCard
        {...jobCardProps}
        t={t}
        isDragging={isDragging}
        dragHandle={
          <button
            type="button"
            className="job-card__drag-handle"
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

export default function ExperienceSection({
  t,
  title,
  jobs,
  hiddenJobs,
  exampleTitle,
  exampleJobs,
  exampleHiddenJobs,
  onChangeTitle,
  onAddJob,
  onReorderJobs,
  onHideJob,
  onRestoreJob,
  onRemoveJob,
  onUpdateJobField,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
  onReorderTask,
  onHideTask,
  onRestoreTask,
  onUpdateNotes,
}: ExperienceSectionProps) {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});
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

  const toggleCollapsed = (collectionKey: "jobs" | "_commentedJobs", index: number) => {
    const key = `${collectionKey}:${index}`;
    setCollapsedCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

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

    onReorderJobs("jobs", fromIndex, toIndex);
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

    onReorderJobs("_commentedJobs", fromIndex, toIndex);
  };

  const canReorderVisibleJobs = jobs.length > 1;
  const canReorderHiddenJobs = hiddenJobs.length > 1;
  const activeVisibleDragJob =
    activeVisibleDragIndex !== null ? jobs[activeVisibleDragIndex] : undefined;
  const activeHiddenDragJob =
    activeHiddenDragIndex !== null ? hiddenJobs[activeHiddenDragIndex] : undefined;

  return (
    <SectionCard
      title={t.experience}
      description={t.experienceDescription}
      actions={
        <button type="button" className="button--small button--with-icon" onClick={() => onAddJob("jobs")}>
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addJob}</span>
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

      {canReorderVisibleJobs ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleVisibleDragStart}
          onDragEnd={handleVisibleDragEnd}
          onDragCancel={() => setActiveVisibleDragIndex(null)}
        >
          <SortableContext items={jobs.map((_, index) => index)} strategy={verticalListSortingStrategy}>
            <div className="stack">
              {jobs.map((job, index) => (
                <SortableJobCard
                  key={`job-${index}`}
                  sortableId={index}
                  t={t}
                  job={job}
                  exampleJob={exampleJobs[index]}
                  index={index}
                  collectionKey="jobs"
                  isHidden={false}
                  onHideJob={onHideJob}
                  onRestoreJob={onRestoreJob}
                  onRemoveJob={onRemoveJob}
                  onUpdateJobField={onUpdateJobField}
                  onUpdateTask={onUpdateTask}
                  onAddTask={onAddTask}
                  onRemoveTask={onRemoveTask}
                  onReorderTask={onReorderTask}
                  onHideTask={onHideTask}
                  onRestoreTask={onRestoreTask}
                  onUpdateNotes={onUpdateNotes}
                  isCollapsed={Boolean(collapsedCards[`jobs:${index}`])}
                  onToggleCollapsed={() => toggleCollapsed("jobs", index)}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay zIndex={120}>
            {activeVisibleDragJob ? (
              <div className="drag-overlay">
                <JobCard
                  t={t}
                  job={activeVisibleDragJob}
                  exampleJob={exampleJobs[activeVisibleDragIndex ?? 0]}
                  index={activeVisibleDragIndex ?? 0}
                  collectionKey="jobs"
                  isHidden={false}
                  onHideJob={onHideJob}
                  onRestoreJob={onRestoreJob}
                  onRemoveJob={onRemoveJob}
                  onUpdateJobField={onUpdateJobField}
                  onUpdateTask={onUpdateTask}
                  onAddTask={onAddTask}
                  onRemoveTask={onRemoveTask}
                  onReorderTask={onReorderTask}
                  onHideTask={onHideTask}
                  onRestoreTask={onRestoreTask}
                  onUpdateNotes={onUpdateNotes}
                  isCollapsed={Boolean(collapsedCards[`jobs:${activeVisibleDragIndex}`])}
                  onToggleCollapsed={() => {}}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="stack">
          {jobs.map((job, index) => (
            <JobCard
              key={`job-${index}`}
              t={t}
              job={job}
              exampleJob={exampleJobs[index]}
              index={index}
              collectionKey="jobs"
              isHidden={false}
              onHideJob={onHideJob}
              onRestoreJob={onRestoreJob}
              onRemoveJob={onRemoveJob}
              onUpdateJobField={onUpdateJobField}
              onUpdateTask={onUpdateTask}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onReorderTask={onReorderTask}
              onHideTask={onHideTask}
              onRestoreTask={onRestoreTask}
              onUpdateNotes={onUpdateNotes}
              isCollapsed={Boolean(collapsedCards[`jobs:${index}`])}
              onToggleCollapsed={() => toggleCollapsed("jobs", index)}
            />
          ))}
        </div>
      )}

      <div className="subsection-header">
        <div>
          <h3>{t.hiddenJobs}</h3>
          <p>{t.hiddenJobsHelp}</p>
        </div>
        <button
          type="button"
          className="button--small button--with-icon"
          onClick={() => onAddJob("_commentedJobs")}
        >
          <Plus className="button__icon" strokeWidth={2} />
          <span>{t.addHiddenJob}</span>
        </button>
      </div>

      {canReorderHiddenJobs ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleHiddenDragStart}
          onDragEnd={handleHiddenDragEnd}
          onDragCancel={() => setActiveHiddenDragIndex(null)}
        >
          <SortableContext items={hiddenJobs.map((_, index) => index)} strategy={verticalListSortingStrategy}>
            <div className="stack">
              {hiddenJobs.map((job, index) => (
                <SortableJobCard
                  key={`hidden-job-${index}`}
                  sortableId={index}
                  t={t}
                  job={job}
                  exampleJob={exampleHiddenJobs[index]}
                  index={index}
                  collectionKey="_commentedJobs"
                  isHidden
                  onHideJob={onHideJob}
                  onRestoreJob={onRestoreJob}
                  onRemoveJob={onRemoveJob}
                  onUpdateJobField={onUpdateJobField}
                  onUpdateTask={onUpdateTask}
                  onAddTask={onAddTask}
                  onRemoveTask={onRemoveTask}
                  onReorderTask={onReorderTask}
                  onHideTask={onHideTask}
                  onRestoreTask={onRestoreTask}
                  onUpdateNotes={onUpdateNotes}
                  isCollapsed={Boolean(collapsedCards[`_commentedJobs:${index}`])}
                  onToggleCollapsed={() => toggleCollapsed("_commentedJobs", index)}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay zIndex={120}>
            {activeHiddenDragJob ? (
              <div className="drag-overlay">
                <JobCard
                  t={t}
                  job={activeHiddenDragJob}
                  exampleJob={exampleHiddenJobs[activeHiddenDragIndex ?? 0]}
                  index={activeHiddenDragIndex ?? 0}
                  collectionKey="_commentedJobs"
                  isHidden
                  onHideJob={onHideJob}
                  onRestoreJob={onRestoreJob}
                  onRemoveJob={onRemoveJob}
                  onUpdateJobField={onUpdateJobField}
                  onUpdateTask={onUpdateTask}
                  onAddTask={onAddTask}
                  onRemoveTask={onRemoveTask}
                  onReorderTask={onReorderTask}
                  onHideTask={onHideTask}
                  onRestoreTask={onRestoreTask}
                  onUpdateNotes={onUpdateNotes}
                  isCollapsed={Boolean(collapsedCards[`_commentedJobs:${activeHiddenDragIndex}`])}
                  onToggleCollapsed={() => {}}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="stack">
          {hiddenJobs.map((job, index) => (
            <JobCard
              key={`hidden-job-${index}`}
              t={t}
              job={job}
              exampleJob={exampleHiddenJobs[index]}
              index={index}
              collectionKey="_commentedJobs"
              isHidden
              onHideJob={onHideJob}
              onRestoreJob={onRestoreJob}
              onRemoveJob={onRemoveJob}
              onUpdateJobField={onUpdateJobField}
              onUpdateTask={onUpdateTask}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onReorderTask={onReorderTask}
              onHideTask={onHideTask}
              onRestoreTask={onRestoreTask}
              onUpdateNotes={onUpdateNotes}
              isCollapsed={Boolean(collapsedCards[`_commentedJobs:${index}`])}
              onToggleCollapsed={() => toggleCollapsed("_commentedJobs", index)}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

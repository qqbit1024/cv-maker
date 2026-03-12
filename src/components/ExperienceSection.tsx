import { useState } from "react";
import { ChevronDown, ChevronUp, EyeOff, Plus, RotateCcw, Trash2 } from "lucide-react";
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
  onMoveJob: (index: number, direction: "up" | "down") => void;
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
  onHideTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onRestoreTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onUpdateNotes: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, value: string) => void;
}

function JobCard({
  t,
  job,
  exampleJob,
  index,
  collectionKey,
  isHidden,
  onMoveJob,
  onHideJob,
  onRestoreJob,
  onRemoveJob,
  onUpdateJobField,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
  onHideTask,
  onRestoreTask,
  onUpdateNotes,
  isCollapsed,
  onToggleCollapsed,
}: {
  t: UIText;
  job: Job;
  exampleJob?: Job;
  index: number;
  collectionKey: "jobs" | "_commentedJobs";
  isHidden: boolean;
  onMoveJob: (index: number, direction: "up" | "down") => void;
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
  onHideTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onRestoreTask: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, taskIndex: number) => void;
  onUpdateNotes: (collectionKey: "jobs" | "_commentedJobs", jobIndex: number, value: string) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}) {
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

  return (
    <article className={`job-card${isHidden ? " job-card--hidden" : ""}${isCollapsed ? " job-card--collapsed" : ""}`}>
      <div className="job-card__header">
        <button type="button" className="job-card__toggle" onClick={onToggleCollapsed}>
          <span className="job-card__toggle-icon" aria-hidden="true">
            {isCollapsed ? <ChevronDown strokeWidth={2} /> : <ChevronUp strokeWidth={2} />}
          </span>
          <span className="job-card__title-wrap">
            <h3>{headerLabel}</h3>
            {metaLabel ? <span className="job-card__meta">{metaLabel}</span> : null}
          </span>
        </button>
        <div className="job-card__actions">
          {!isHidden ? (
            <>
              <IconButton icon={ChevronUp} label={t.moveUp} onClick={() => onMoveJob(index, "up")} />
              <IconButton
                icon={ChevronDown}
                label={t.moveDown}
                onClick={() => onMoveJob(index, "down")}
              />
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

          <div className="stack">
            {visibleTasks.map((task: JobTask, taskIndex) => (
              <div key={`${collectionKey}-${index}-task-${taskIndex}`} className="task-row">
                <Field
                  label={t.bullet(taskIndex)}
                  value={task.text}
                  onChange={(value) => onUpdateTask(collectionKey, index, "tasks", taskIndex, value)}
                  autoClearValue={exampleVisibleTasks[taskIndex]?.text ?? ""}
                  multiline
                  rows={1}
                />
                <div className="task-row__actions">
                  <IconButton icon={EyeOff} label={t.hideBullet} onClick={() => onHideTask(collectionKey, index, taskIndex)} />
                  <IconButton
                    icon={Trash2}
                    label={t.deleteBullet}
                    tone="ghost"
                    onClick={() => onRemoveTask(collectionKey, index, "tasks", taskIndex)}
                  />
                </div>
              </div>
            ))}
          </div>

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

          <div className="stack">
            {hiddenTasks.map((task: JobTask, taskIndex) => (
              <div key={`${collectionKey}-${index}-hidden-task-${taskIndex}`} className="task-row">
                <Field
                  label={t.bullet(taskIndex)}
                  value={task.text}
                  onChange={(value) =>
                    onUpdateTask(collectionKey, index, "_commentedTasks", taskIndex, value)
                  }
                  autoClearValue={exampleHiddenTasks[taskIndex]?.text ?? ""}
                  multiline
                  rows={1}
                />
                <div className="task-row__actions">
                  <IconButton
                    icon={RotateCcw}
                    label={t.restoreBullet}
                    onClick={() => onRestoreTask(collectionKey, index, taskIndex)}
                  />
                  <IconButton
                    icon={Trash2}
                    label={t.deleteHiddenBullet}
                    tone="ghost"
                    onClick={() =>
                      onRemoveTask(collectionKey, index, "_commentedTasks", taskIndex)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

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
  onMoveJob,
  onHideJob,
  onRestoreJob,
  onRemoveJob,
  onUpdateJobField,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
  onHideTask,
  onRestoreTask,
  onUpdateNotes,
}: ExperienceSectionProps) {
  const [collapsedCards, setCollapsedCards] = useState<Record<string, boolean>>({});

  const toggleCollapsed = (collectionKey: "jobs" | "_commentedJobs", index: number) => {
    const key = `${collectionKey}:${index}`;
    setCollapsedCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

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
      <div className="field-grid">
        <Field
          label={t.sectionTitle}
          value={title}
          onChange={onChangeTitle}
          autoClearValue={exampleTitle}
        />
      </div>

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
            onMoveJob={onMoveJob}
            onHideJob={onHideJob}
            onRestoreJob={onRestoreJob}
            onRemoveJob={onRemoveJob}
            onUpdateJobField={onUpdateJobField}
            onUpdateTask={onUpdateTask}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onHideTask={onHideTask}
            onRestoreTask={onRestoreTask}
            onUpdateNotes={onUpdateNotes}
            isCollapsed={Boolean(collapsedCards[`jobs:${index}`])}
            onToggleCollapsed={() => toggleCollapsed("jobs", index)}
          />
        ))}
      </div>

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
            onMoveJob={onMoveJob}
            onHideJob={onHideJob}
            onRestoreJob={onRestoreJob}
            onRemoveJob={onRemoveJob}
            onUpdateJobField={onUpdateJobField}
            onUpdateTask={onUpdateTask}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onHideTask={onHideTask}
            onRestoreTask={onRestoreTask}
            onUpdateNotes={onUpdateNotes}
            isCollapsed={Boolean(collapsedCards[`_commentedJobs:${index}`])}
            onToggleCollapsed={() => toggleCollapsed("_commentedJobs", index)}
          />
        ))}
      </div>
    </SectionCard>
  );
}

import { AlertTriangle, CircleCheckBig, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";
import { analyzeResumeQuality } from "../utils/quality";
import { getResumeCompletion } from "../utils/resumeState";

export default function QualityPage() {
  const studio = useStudioOutlet();
  const completion = useMemo(
    () =>
      getResumeCompletion(
        studio.resume,
        studio.skills,
        studio.defaultResume,
        studio.defaultSkills
      ),
    [studio.resume, studio.skills, studio.defaultResume, studio.defaultSkills]
  );
  const analysis = useMemo(
    () => analyzeResumeQuality(studio.resume, studio.skills, studio.t, completion.percent),
    [studio.resume, studio.skills, studio.t, completion.percent]
  );

  return (
    <section className="page-panel">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navQuality}</p>
          <h2>{studio.t.qualityTitle}</h2>
          <p>{studio.t.qualityDescription}</p>
        </div>
      </div>

      <div className="page-panel__body">
        {analysis.isDraft ? (
          <>
            <div className="empty-state">
              <h3>{studio.t.qualityDraftTitle}</h3>
              <p>{studio.t.qualityDraftDescription}</p>
            </div>

            <div className="insight-card">
              <h3>{studio.t.qualityDraftChecklistTitle}</h3>
              <div className="suggestion-list">
                {analysis.draftChecklist.map((suggestion) => (
                  <div key={suggestion} className="suggestion-item">
                    <Sparkles className="button__icon" strokeWidth={2} />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="vacancy-grid quality-score-grid">
              <div className="vacancy-score-card">
                <span className="vacancy-score-card__label">{studio.t.qualityScore}</span>
                <strong>{analysis.score}</strong>
              </div>
              <div className="vacancy-score-card">
                <span className="vacancy-score-card__label">{studio.t.qualityStrong}</span>
                <strong>{analysis.strongCount}</strong>
              </div>
              <div className="vacancy-score-card">
                <span className="vacancy-score-card__label">{studio.t.qualityNeedsAttention}</span>
                <strong>{analysis.needsAttentionCount}</strong>
              </div>
            </div>

            {analysis.issues.length ? (
              <div className="quality-issues-grid">
                {analysis.issues.map((issue) => (
                  <article key={issue.id} className="quality-issue-card">
                    <div className="quality-issue-card__header">
                      <div className="quality-issue-card__meta">
                        <span
                          className={`quality-issue-card__badge quality-issue-card__badge--${issue.severity}`}
                        >
                          {issue.severity === "error"
                            ? studio.t.qualityNeedsAttention
                            : studio.t.qualityIssues}
                        </span>
                        <span className="status-caption">{issue.section}</span>
                      </div>
                      <AlertTriangle className="button__icon" strokeWidth={2} />
                    </div>
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>{studio.t.qualityNoIssuesTitle}</h3>
                <p>{studio.t.qualityNoIssuesDescription}</p>
              </div>
            )}

            <div className="page-card-grid">
              <div className="insight-card">
                <h3>{studio.t.qualitySuggestions}</h3>
                <div className="suggestion-list">
                  {analysis.suggestions.length ? (
                    analysis.suggestions.map((suggestion) => (
                      <div key={suggestion} className="suggestion-item">
                        <Sparkles className="button__icon" strokeWidth={2} />
                        <span>{suggestion}</span>
                      </div>
                    ))
                  ) : (
                    <div className="suggestion-item">
                      <CircleCheckBig className="button__icon" strokeWidth={2} />
                      <span>{studio.t.qualityNoIssuesDescription}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="insight-card">
                <h3>{studio.t.qualityIssues}</h3>
                <div className="tag-list">
                  {analysis.issues.length ? (
                    analysis.issues.map((issue) => (
                      <span
                        key={issue.id}
                        className={`tag ${issue.severity === "error" ? "tag--error" : "tag--warning"}`}
                      >
                        {issue.title}
                      </span>
                    ))
                  ) : (
                    <span className="tag tag--success">{studio.t.qualityNoIssuesTitle}</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

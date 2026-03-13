import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { useStudioOutlet } from "../hooks/useStudioOutlet";
import { analyzeVacancy, createEmptyVacancyDraft, loadVacancyDrafts, saveVacancyDrafts } from "../utils/vacancy";

export default function VacancyPage() {
  const studio = useStudioOutlet();
  const [draftsByLanguage, setDraftsByLanguage] = useState(() => loadVacancyDrafts());

  useEffect(() => {
    saveVacancyDrafts(draftsByLanguage);
  }, [draftsByLanguage]);

  const draft = draftsByLanguage[studio.activeLanguage] ?? createEmptyVacancyDraft();
  const analysis = useMemo(
    () => analyzeVacancy(draft, studio.resume, studio.skills),
    [draft, studio.resume, studio.skills]
  );

  const updateDraftField = (
    field: "role" | "company" | "description" | "notes",
    value: string
  ) => {
    setDraftsByLanguage((current) => ({
      ...current,
      [studio.activeLanguage]: {
        ...(current[studio.activeLanguage] ?? createEmptyVacancyDraft()),
        [field]: value,
      },
    }));
  };

  const suggestions = [];

  if (analysis.missingKeywords.length) {
    suggestions.push(studio.t.vacancySuggestionKeywords);
  }

  if (
    analysis.missingKeywords.some((keyword) =>
      ["mentoring", "code review", "leadership", "ownership"].includes(keyword.toLowerCase())
    )
  ) {
    suggestions.push(studio.t.vacancySuggestionLeadership);
  }

  if (
    analysis.missingKeywords.some((keyword) =>
      [
        "performance optimization",
        "system design",
        "software architecture",
        "real-time",
      ].includes(keyword.toLowerCase())
    )
  ) {
    suggestions.push(studio.t.vacancySuggestionScale);
  }

  if (!suggestions.length && draft.description.trim()) {
    suggestions.push(studio.t.vacancySuggestionStrong);
  }

  return (
    <section className="page-panel">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navVacancy}</p>
          <h2>{studio.t.vacancyTitle}</h2>
          <p>{studio.t.vacancyDescription}</p>
        </div>
      </div>

      <div className="page-panel__body">
        <div className="field-grid field-grid--triple">
          <label className="field">
            <span className="field__label">{studio.t.vacancyRole}</span>
            <input
              className="field__control"
              value={draft.role}
              onChange={(event) => updateDraftField("role", event.target.value)}
            />
          </label>

          <label className="field">
            <span className="field__label">{studio.t.vacancyCompany}</span>
            <input
              className="field__control"
              value={draft.company}
              onChange={(event) => updateDraftField("company", event.target.value)}
            />
          </label>

          <div className="vacancy-score-card">
            <span className="vacancy-score-card__label">{studio.t.vacancyCoverage}</span>
            <strong>{analysis.score}%</strong>
          </div>
        </div>

        <label className="field">
          <span className="field__label">{studio.t.vacancyInput}</span>
          <textarea
            className="field__control field__control--textarea"
            value={draft.description}
            onChange={(event) => updateDraftField("description", event.target.value)}
          />
          <p className="field__hint">{studio.t.vacancyInputHint}</p>
        </label>

        <label className="field">
          <span className="field__label">{studio.t.vacancyNotes}</span>
          <textarea
            className="field__control field__control--textarea"
            value={draft.notes}
            onChange={(event) => updateDraftField("notes", event.target.value)}
          />
        </label>

        {analysis.extractedKeywords.length ? (
          <div className="vacancy-grid">
            <div className="insight-card">
              <h3>{studio.t.vacancyExtractedKeywords}</h3>
              <div className="tag-list">
                {analysis.extractedKeywords.map((keyword) => (
                  <span key={keyword} className="tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="insight-card">
              <h3>{studio.t.vacancyMatchedKeywords}</h3>
              <div className="tag-list">
                {analysis.matchedKeywords.length ? (
                  analysis.matchedKeywords.map((keyword) => (
                    <span key={keyword} className="tag tag--success">
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="status">{studio.t.vacancyNoMatches}</p>
                )}
              </div>
            </div>

            <div className="insight-card">
              <h3>{studio.t.vacancyMissingKeywords}</h3>
              <div className="tag-list">
                {analysis.missingKeywords.length ? (
                  analysis.missingKeywords.map((keyword) => (
                    <span key={keyword} className="tag tag--warning">
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="status">{studio.t.vacancyAllKeywordsCovered}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3>{studio.t.vacancyEmptyTitle}</h3>
            <p>{studio.t.vacancyEmptyDescription}</p>
          </div>
        )}

        <div className="insight-card">
          <h3>{studio.t.vacancySuggestions}</h3>
          <div className="suggestion-list">
            {suggestions.map((suggestion) => (
              <div key={suggestion} className="suggestion-item">
                <Sparkles className="button__icon" strokeWidth={2} />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

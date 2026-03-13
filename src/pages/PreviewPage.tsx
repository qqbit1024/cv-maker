import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, LayoutTemplate, RefreshCcw } from "lucide-react";
import fontUrl from "../../fonts/helvetica_regular.otf";
import { useStudioOutlet } from "../hooks/useStudioOutlet";
import { createResumePdf } from "../lib/pdfTemplate";
import type { ResumeTemplateId } from "../types/resume";

export default function PreviewPage() {
  const studio = useStudioOutlet();
  const deferredResume = useDeferredValue(studio.resume);
  const deferredSkills = useDeferredValue(studio.skills);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const fontBytesRef = useRef<ArrayBuffer | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const previewSignature = useMemo(
    () =>
      JSON.stringify({
        resume: deferredResume,
        skills: deferredSkills,
        language: studio.activeLanguage,
        template: studio.activeResumeTemplate,
        refreshKey,
      }),
    [deferredResume, deferredSkills, studio.activeLanguage, studio.activeResumeTemplate, refreshKey]
  );

  useEffect(() => {
    let isCancelled = false;
    const timeoutId = window.setTimeout(async () => {
      setIsRendering(true);
      setError("");

      try {
        if (!fontBytesRef.current) {
          const fontResponse = await fetch(fontUrl);
          fontBytesRef.current = await fontResponse.arrayBuffer();
        }

        const bytes = await createResumePdf({
          resumeData: deferredResume,
          skillsData: deferredSkills,
          fontBytes: fontBytesRef.current,
          templateId: studio.activeResumeTemplate,
        });
        const pdfBuffer =
          bytes.buffer instanceof ArrayBuffer
            ? bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
            : Uint8Array.from(bytes).buffer;
        const blob = new Blob([pdfBuffer], { type: "application/pdf" });
        const nextUrl = URL.createObjectURL(blob);

        if (isCancelled) {
          URL.revokeObjectURL(nextUrl);
          return;
        }

        setPreviewUrl((current) => {
          if (current) {
            URL.revokeObjectURL(current);
          }

          previewUrlRef.current = nextUrl;
          return nextUrl;
        });
        setUpdatedAt(new Date().toISOString());
      } catch (renderError) {
        if (!isCancelled) {
          setError(
            studio.t.previewError(
              renderError instanceof Error ? renderError.message : studio.t.unknownError
            )
          );
        }
      } finally {
        if (!isCancelled) {
          setIsRendering(false);
        }
      }
    }, 260);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [deferredResume, deferredSkills, previewSignature, studio.t]);

  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!isTemplateModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTemplateModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTemplateModalOpen]);

  const refreshPreview = () => {
    startTransition(() => {
      setRefreshKey((current) => current + 1);
    });
  };

  const openPreviewInNewTab = () => {
    if (!previewUrl) {
      return;
    }

    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  const templateOptions: Array<{
    id: ResumeTemplateId;
    title: string;
    description: string;
  }> = [
    {
      id: "classic",
      title: studio.t.templateClassic,
      description: studio.t.templateClassicDescription,
    },
    {
      id: "compact",
      title: studio.t.templateCompact,
      description: studio.t.templateCompactDescription,
    },
    {
      id: "minimal",
      title: studio.t.templateMinimal,
      description: studio.t.templateMinimalDescription,
    },
  ];

  const activeTemplate = templateOptions.find(
    (template) => template.id === studio.activeResumeTemplate
  ) ?? templateOptions[0];

  return (
    <section className="page-panel page-panel--preview">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navPreview}</p>
          <h2>{studio.t.previewTitle}</h2>
          <p>{studio.t.previewDescription}</p>
        </div>
        <div className="page-panel__actions page-panel__actions--preview">
          <div className="preview-actions-stack">
            <button
              type="button"
              className="button--with-icon button--small"
              onClick={refreshPreview}
            >
              <RefreshCcw className="button__icon" strokeWidth={2} />
              <span>{studio.t.previewRefresh}</span>
            </button>
            <button
              type="button"
              className="button--with-icon button--small"
              onClick={openPreviewInNewTab}
              disabled={!previewUrl}
            >
              <ExternalLink className="button__icon" strokeWidth={2} />
              <span>{studio.t.previewOpenInNewTab}</span>
            </button>
            <button
              type="button"
              className="button--with-icon button--small"
              onClick={() => setIsTemplateModalOpen(true)}
            >
              <LayoutTemplate className="button__icon" strokeWidth={2} />
              <span>{studio.t.pdfTemplate}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-panel__body page-panel__body--preview">
        <div className="preview-toolbar">
          <div className="preview-toolbar__group">
            <span className="status-caption">{studio.t.activeResumeLanguage}</span>
            <strong>{studio.activeResumeLanguageLabel}</strong>
          </div>
          <div className="preview-toolbar__group preview-toolbar__group--wide">
            <span className="status-caption">{studio.t.pdfTemplate}</span>
            <strong>{activeTemplate.title}</strong>
            <span className="status">{activeTemplate.description}</span>
          </div>
          <div className="preview-toolbar__group preview-toolbar__group--status">
            <span className="status-caption">{studio.t.navPreview}</span>
            <span className="status">
              {isRendering
                ? studio.t.previewRefreshing
                : updatedAt
                ? studio.t.previewUpdatedAt(
                    new Intl.DateTimeFormat(studio.uiLanguage, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(updatedAt))
                  )
                : studio.t.previewWaiting}
            </span>
          </div>
        </div>

        {error ? <p className="page-note page-note--error">{error}</p> : null}

        <div className="preview-frame-wrap">
          {previewUrl ? (
            <iframe
              key={previewUrl}
              title={studio.t.previewFrameTitle}
              className="preview-frame"
              src={previewUrl}
            />
          ) : (
            <div className="empty-state">
              <h3>{studio.t.previewWaitingTitle}</h3>
              <p>{studio.t.previewWaitingDescription}</p>
            </div>
          )}
        </div>
      </div>

      {isTemplateModalOpen ? (
        <div
          className="modal-backdrop"
          onClick={() => setIsTemplateModalOpen(false)}
          role="presentation"
        >
          <div
            className="modal-card modal-card--wide modal-card--template-picker"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={studio.t.pdfTemplate}
          >
            <div className="modal-card__header">
              <div className="modal-card__title-block">
                <h3>{studio.t.pdfTemplate}</h3>
                <p className="status">{studio.t.pdfTemplateHint}</p>
              </div>
              <div className="modal-card__header-actions">
                <button
                  type="button"
                  className="button--ghost button--small"
                  onClick={() => setIsTemplateModalOpen(false)}
                >
                  {studio.t.closeModal}
                </button>
              </div>
            </div>
            <div className="modal-card__body">
              <div className="template-grid">
                {templateOptions.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    className={`template-card${
                      studio.activeResumeTemplate === template.id ? " template-card--active" : ""
                    }`}
                    onClick={() => {
                      studio.updateResumeTemplate(template.id);
                      setIsTemplateModalOpen(false);
                    }}
                  >
                    <span
                      className={`template-card__thumb template-card__thumb--${template.id}`}
                      aria-hidden="true"
                    >
                      <span className="template-card__page">
                        <span className="template-card__hero" />
                        <span className="template-card__line template-card__line--short" />
                        <span className="template-card__line" />
                        <span className="template-card__line" />
                        <span className="template-card__columns">
                          <span />
                          <span />
                          <span />
                        </span>
                      </span>
                    </span>
                    <strong>{template.title}</strong>
                    <span>{template.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

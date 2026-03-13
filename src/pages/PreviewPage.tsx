import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import fontUrl from "../../fonts/helvetica_regular.otf";
import { useStudioOutlet } from "../hooks/useStudioOutlet";
import { createResumePdf } from "../lib/pdfTemplate";

export default function PreviewPage() {
  const studio = useStudioOutlet();
  const deferredResume = useDeferredValue(studio.resume);
  const deferredSkills = useDeferredValue(studio.skills);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const fontBytesRef = useRef<ArrayBuffer | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const previewSignature = useMemo(
    () =>
      JSON.stringify({
        resume: deferredResume,
        skills: deferredSkills,
        language: studio.activeLanguage,
        refreshKey,
      }),
    [deferredResume, deferredSkills, studio.activeLanguage, refreshKey]
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

  return (
    <section className="page-panel page-panel--preview">
      <div className="page-panel__header">
        <div className="page-panel__title-block">
          <p className="page-panel__eyebrow">{studio.t.navPreview}</p>
          <h2>{studio.t.previewTitle}</h2>
          <p>{studio.t.previewDescription}</p>
        </div>
        <div className="page-panel__actions">
          <button type="button" className="button--with-icon button--small" onClick={refreshPreview}>
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
        </div>
      </div>

      <div className="page-panel__body page-panel__body--preview">
        <div className="preview-toolbar">
          <span className="status-caption">{studio.t.activeResumeLanguage}</span>
          <strong>{studio.activeResumeLanguageLabel}</strong>
          <span className="preview-toolbar__spacer" />
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
    </section>
  );
}

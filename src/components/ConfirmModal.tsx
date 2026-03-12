interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  closeLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel,
  closeLabel,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-card__header">
          <h3>{title}</h3>
          <button type="button" className="button--ghost button--small" onClick={onClose}>
            {closeLabel}
          </button>
        </div>

        <div className="modal-card__body">
          <p className="modal-card__message">{message}</p>

          <div className="modal-card__actions">
            <button type="button" className="button--ghost" onClick={onClose}>
              {closeLabel}
            </button>
            <button type="button" className="button--primary" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

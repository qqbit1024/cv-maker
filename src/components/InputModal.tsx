interface InputModalProps {
  title: string;
  label: string;
  placeholder: string;
  value: string;
  confirmLabel: string;
  closeLabel: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function InputModal({
  title,
  label,
  placeholder,
  value,
  confirmLabel,
  closeLabel,
  onChange,
  onConfirm,
  onClose,
}: InputModalProps) {
  const isDisabled = !value.trim();

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
          <label className="field">
            <span className="field__label">{label}</span>
            <input
              className="field__control"
              value={value}
              placeholder={placeholder}
              autoFocus
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !isDisabled) {
                  onConfirm();
                }
              }}
            />
          </label>

          <div className="modal-card__actions">
            <button type="button" className="button--ghost" onClick={onClose}>
              {closeLabel}
            </button>
            <button type="button" className="button--primary" disabled={isDisabled} onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

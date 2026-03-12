interface ActionModalItem {
  key: string;
  label: string;
  onClick: () => void;
}

interface ActionModalProps {
  title: string;
  items: ActionModalItem[];
  closeLabel: string;
  onClose: () => void;
}

export default function ActionModal({
  title,
  items,
  closeLabel,
  onClose,
}: ActionModalProps) {
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
          {items.map((item) => (
            <button key={item.key} type="button" onClick={item.onClick}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


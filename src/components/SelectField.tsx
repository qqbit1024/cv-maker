import { Check, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

interface SelectFieldProps {
  label?: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

export default function SelectField({
  label = "",
  value,
  options,
  placeholder,
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownStyle, setDropdownStyle] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom - 12;
      const preferredHeight = Math.min(56 * options.length + 16, 360);
      const shouldOpenUp = spaceBelow < 220 && rect.top > spaceBelow;
      const maxHeight = shouldOpenUp
        ? Math.max(160, rect.top - 16)
        : Math.max(160, viewportHeight - rect.bottom - 16);

      setDropdownStyle({
        left: rect.left,
        top: shouldOpenUp ? rect.top - 8 : rect.bottom + 8,
        width: rect.width,
        maxHeight: Math.min(preferredHeight, maxHeight),
        transform: shouldOpenUp ? "translateY(-100%)" : "none",
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        !rootRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    updatePosition();
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, options.length]);

  return (
    <div
      ref={rootRef}
      className={`field select-menu${isOpen ? " select-menu--open" : ""}`}
    >
      {label ? <span className="field__label">{label}</span> : null}

      <button
        ref={triggerRef}
        type="button"
        className={`select-menu__trigger${isOpen ? " select-menu__trigger--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className={`select-menu__value${value ? "" : " select-menu__value--placeholder"}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="select-menu__caret" strokeWidth={2} />
      </button>

      {isOpen
        ? createPortal(
            <div
              ref={dropdownRef}
              className="select-menu__dropdown select-menu__dropdown--floating"
              style={dropdownStyle}
              role="listbox"
              aria-label={label}
            >
              {options.map((option) => {
                const optionLabel = option || placeholder;
                const isSelected = option === value;

                return (
                  <button
                    key={option || "empty"}
                    type="button"
                    className={`select-menu__option${
                      isSelected ? " select-menu__option--active" : ""
                    }`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  >
                    <span>{optionLabel}</span>
                    <Check
                      className={`select-menu__check${
                        isSelected ? " select-menu__check--visible" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

import { useRef } from "react";
import type { ChangeEventHandler, FocusEventHandler } from "react";

interface FieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  mono?: boolean;
  autoClearValue?: string;
}

export default function Field({
  label = "",
  value,
  onChange,
  multiline = false,
  rows = 3,
  mono = false,
  autoClearValue,
}: FieldProps) {
  const className = `field__control${mono ? " field__control--mono" : ""}`;
  const shouldRestoreAutoClearValueRef = useRef(false);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    onChange(event.target.value);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = () => {
    if (!value || !autoClearValue || value !== autoClearValue) {
      shouldRestoreAutoClearValueRef.current = false;
      return;
    }

    shouldRestoreAutoClearValueRef.current = true;
    onChange("");
  };

  const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = () => {
    if (!shouldRestoreAutoClearValueRef.current) {
      return;
    }

    shouldRestoreAutoClearValueRef.current = false;

    if (String(value ?? "").trim() || !autoClearValue) {
      return;
    }

    onChange(autoClearValue);
  };

  return (
    <label className="field">
      {label ? <span className="field__label">{label}</span> : null}
      {multiline ? (
        <textarea
          className={className}
          value={value}
          rows={rows}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          className={className}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </label>
  );
}

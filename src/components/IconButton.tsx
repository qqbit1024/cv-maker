import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  tone?: "default" | "ghost" | "danger";
}

export default function IconButton({
  icon: Icon,
  label,
  tone = "default",
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`button--icon button--icon-${tone} ${className}`.trim()}
      aria-label={label}
      title={label}
      {...props}
    >
      <Icon className="button__icon" strokeWidth={2} />
    </button>
  );
}

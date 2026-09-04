import { ReactNode } from "react";
import { clsx } from "clsx";

export function Badge({
  children,
  icon,
  tone = "default",
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "copper" | "outline";
  className?: string;
}) {
  const toneClasses = {
    default: "bg-cream-deep text-espresso",
    copper: "bg-copper/10 text-copper",
    outline: "border border-hairline text-espresso-soft",
  }[tone];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-wider",
        toneClasses,
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

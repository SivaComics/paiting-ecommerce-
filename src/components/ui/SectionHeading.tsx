import { ReactNode } from "react";
import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={clsx(
            "mb-4 flex items-center gap-3 text-xs font-sans font-medium uppercase tracking-[0.25em] text-copper",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-copper" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl sm:text-5xl text-espresso text-balance-pretty">{title}</h2>
      {description && (
        <p className="mt-5 text-espresso-soft leading-relaxed text-[15px] sm:text-base">{description}</p>
      )}
    </div>
  );
}

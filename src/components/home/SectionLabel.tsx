import { clsx } from "clsx";

/** Editorial section label: a copper numeral, a short copper rule, then the name. */
export function SectionLabel({
  number,
  children,
  dark = false,
  className,
}: {
  number: string;
  children: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p className={clsx("flex items-center gap-4", className)}>
      <span
        className={clsx(
          "font-serif text-2xl italic leading-none",
          dark ? "text-copper-metal-bright" : "text-copper-metal"
        )}
      >
        {number}
      </span>
      <span className={clsx("block w-8", dark ? "copper-rule-bright" : "copper-rule")} aria-hidden="true" />
      <span
        className={clsx(
          "text-[11px] font-sans uppercase tracking-[0.28em]",
          dark ? "text-copper-light" : "text-copper-deep"
        )}
      >
        {children}
      </span>
    </p>
  );
}

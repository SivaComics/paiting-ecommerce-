import { clsx } from "clsx";

/**
 * Section divider in brushed copper (see .copper-rule in globals.css).
 * `accent` draws a short centred rule instead of a full-width line.
 */
export function HairlineDivider({ className, accent = false }: { className?: string; accent?: boolean }) {
  if (accent) {
    return (
      <div className={clsx("flex justify-center", className)} aria-hidden="true">
        <span className="copper-rule block w-24" />
      </div>
    );
  }
  return <hr className={clsx("copper-rule", className)} />;
}

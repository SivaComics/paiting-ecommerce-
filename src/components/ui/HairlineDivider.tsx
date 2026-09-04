import { clsx } from "clsx";

export function HairlineDivider({ className, accent = false }: { className?: string; accent?: boolean }) {
  if (accent) {
    return (
      <div className={clsx("relative border-t border-hairline", className)} aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-px w-12 -translate-x-1/2 -translate-y-px bg-copper" />
      </div>
    );
  }
  return <hr className={clsx("border-t border-hairline", className)} />;
}

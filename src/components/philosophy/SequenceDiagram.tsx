const STEPS = ["Potential", "Direction", "Circulation", "Transformation", "Stabilization", "Retention", "Unity"];

export function SequenceDiagram() {
  return (
    <div className="relative py-2">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-hairline sm:left-0 sm:right-0 sm:top-3 sm:bottom-auto sm:h-px sm:w-auto" aria-hidden="true" />

      <ol className="relative flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-2">
        {STEPS.map((step) => (
          <li
            key={step}
            className="relative flex flex-1 items-center gap-4 sm:flex-col sm:items-center sm:gap-4 sm:text-center"
          >
            <span className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-copper bg-cream">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            </span>
            <span className="text-xs font-sans uppercase tracking-[0.15em] text-espresso-soft sm:text-[11px]">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

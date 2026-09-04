// Five tonal bands within the site's existing warm palette — a gradation,
// not five distinct hues, matching the section's point that these are
// levels of organization rather than five separate physical substances.
const BANDS = [
  "var(--color-copper-deep)",
  "var(--color-copper)",
  "var(--color-copper-light)",
  "var(--color-cream-deep)",
  "var(--color-cream)",
];

export function PanchaBhuthaBands() {
  return (
    <div className="flex h-32 w-full max-w-md flex-col overflow-hidden border border-hairline sm:h-40" aria-hidden="true">
      {BANDS.map((color, i) => (
        <span key={i} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

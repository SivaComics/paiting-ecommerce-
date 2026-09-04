// Nine muted fields below the single circle above. Most reuse the site's
// existing copper/cream/espresso tokens; three (marked below) are one-off
// accent tones added only for this illustration, as called for by the
// "qualitative diversity" the section describes — they aren't exported as
// reusable design tokens anywhere else.
const NINE_COLOURS = [
  "var(--color-copper)",
  "var(--color-copper-light)",
  "var(--color-copper-deep)",
  "#8a9a86" /* muted sage — one-off accent */,
  "var(--color-espresso-soft)",
  "#7c8a99" /* muted slate-blue — one-off accent */,
  "var(--color-blush)",
  "#b98a83" /* muted rose — one-off accent */,
  "var(--color-cream-deep)",
];

export function NineColoursIllustration() {
  return (
    <div className="flex flex-col items-center gap-8">
      <span
        className="h-14 w-14 rounded-full border border-hairline bg-cream shadow-sm sm:h-16 sm:w-16"
        aria-hidden="true"
      />
      <div className="grid grid-cols-3 gap-4 sm:gap-5">
        {NINE_COLOURS.map((color, i) => (
          <span
            key={i}
            className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

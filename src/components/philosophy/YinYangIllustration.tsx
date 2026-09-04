// Rendered as an unfilled outline (stroke only) rather than the traditional
// two-tone fill, to stay consistent with this page's line-art convention —
// and, fittingly, small and centered in open space, echoing the section's
// own point that the symbol occupies only the centre, never the whole.
export function YinYangIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20" aria-hidden="true">
      <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-copper)" strokeWidth="1.5" />
      <path
        d="M50,12 A19,19 0 0,1 50,50 A19,19 0 0,0 50,88"
        fill="none"
        stroke="var(--color-copper)"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="31" r="3.5" fill="none" stroke="var(--color-copper)" strokeWidth="1.5" />
      <circle cx="50" cy="69" r="3.5" fill="none" stroke="var(--color-copper)" strokeWidth="1.5" />
    </svg>
  );
}

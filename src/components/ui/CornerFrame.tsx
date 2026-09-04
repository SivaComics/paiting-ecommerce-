export function CornerFrame({ className }: { className?: string }) {
  const corner = "absolute h-4 w-4 border-copper opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100";
  return (
    <div className={`pointer-events-none absolute inset-3 ${className ?? ""}`} aria-hidden="true">
      <span className={`${corner} top-0 left-0 border-t border-l`} />
      <span className={`${corner} top-0 right-0 border-t border-r`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

import { ShieldCheck, PackageCheck, BadgeCheck, Undo2 } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Insured Worldwide Shipping" },
  { icon: Undo2, label: "14-Day Returns" },
  { icon: BadgeCheck, label: "Third-Party Authentication" },
  { icon: PackageCheck, label: "Secure Escrow Payment" },
];

export function TrustStrip({ className }: { className?: string }) {
  return (
    <div className={`border-y border-hairline bg-cream-deep/60 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="group flex items-center gap-2 text-espresso-soft hover:text-espresso transition-colors duration-300 ease-premium"
          >
            <Icon
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-copper/70 group-hover:text-copper transition-colors duration-300 ease-premium"
            />
            <span className="text-[11px] font-sans uppercase tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

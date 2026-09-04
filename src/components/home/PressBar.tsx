import { pressLogos } from "@/lib/data/press";
import { RevealOnScroll } from "@/components/ui/motion";

export function PressBar() {
  return (
    <section className="border-y border-copper/15 bg-cream-deep/40">
      <RevealOnScroll>
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="text-center text-xs font-sans uppercase tracking-[0.25em] text-espresso-soft mb-8">
            As Seen In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-5">
            {pressLogos.map((p) => (
              <span
                key={p.name}
                className="font-serif text-lg sm:text-xl text-espresso-soft/60 hover:text-copper/80 transition-colors duration-500 ease-premium whitespace-nowrap"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

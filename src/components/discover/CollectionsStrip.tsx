import Link from "next/link";
import { collections } from "@/lib/data/collections";
import { RevealOnScroll, ZoomOnHover } from "@/components/ui/motion";

export function CollectionsStrip() {
  return (
    <div id="collections" className="scroll-mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {collections.map((c, i) => (
        <RevealOnScroll key={c.id} delay={i * 0.05}>
          <Link
            href={`/discover?collection=${c.id}#grid`}
            className="group block relative transition-transform duration-500 ease-premium hover:-translate-y-1"
          >
            <ZoomOnHover className="relative aspect-[4/5] w-full bg-cream-deep border border-transparent group-hover:border-copper/30 group-hover:shadow-premium transition-[box-shadow,border-color] duration-500 ease-premium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.coverImage}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </ZoomOnHover>
            <div className="absolute inset-0 bg-gradient-espresso-veil flex items-end p-4">
              <p className="font-serif text-lg text-cream">{c.title}</p>
            </div>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}

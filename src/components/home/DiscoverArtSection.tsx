import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/motion";
import {
  NewArrivalsThumbnail,
  PaintingThumbnail,
  PhotographyThumbnail,
  SculptureThumbnail,
} from "./CategoryThumbnails";

const categories = [
  { label: "Paintings", href: "/discover?medium=Painting", Thumb: PaintingThumbnail },
  { label: "Sculpture", href: "/discover?medium=Sculpture", Thumb: SculptureThumbnail },
  { label: "Photography", href: "/discover?medium=Photography", Thumb: PhotographyThumbnail },
  { label: "New Arrivals", href: "/discover?newArrivals=1", Thumb: NewArrivalsThumbnail },
];

export function DiscoverArtSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <RevealOnScroll>
        <SectionHeading eyebrow="Start Here" title="Discover Art" className="mb-12" />
      </RevealOnScroll>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(({ label, href, Thumb }, i) => (
          <RevealOnScroll key={label} delay={i * 0.05}>
            <Link
              href={href}
              className="group flex items-center gap-5 bg-cream border border-hairline rounded-xl p-5 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-premium hover:border-copper/40"
            >
              <span className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-hairline transition-transform duration-500 ease-premium group-hover:scale-105">
                <Thumb />
              </span>
              <span className="font-serif text-lg text-espresso group-hover:text-copper transition-colors duration-300 ease-premium">
                {label}
              </span>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

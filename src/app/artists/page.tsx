import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { RevealOnScroll, ZoomOnHover } from "@/components/ui/motion";
import { artists } from "@/lib/data/artists";
import { BadgeCheck } from "lucide-react";

export const metadata = {
  title: "Artists — Auréline",
  description: "Independent and gallery-represented artists working with Auréline.",
};

export default function ArtistsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="The Artists"
        title="Independent & Gallery-Represented"
        description="Painters, sculptors, and photographers from around the world, each authenticated and represented on Auréline."
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {artists.map((artist, i) => (
          <RevealOnScroll key={artist.id} delay={(i % 3) * 0.05}>
            <Link
              href={`/artist/${artist.slug}`}
              className="group block transition-transform duration-500 ease-premium hover:-translate-y-1"
            >
              <ZoomOnHover className="relative aspect-[4/5] w-full bg-cream-deep border border-transparent group-hover:border-copper/30 group-hover:shadow-premium transition-[box-shadow,border-color] duration-500 ease-premium">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artist.portraitImage}
                  alt={artist.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </ZoomOnHover>
              <div className="mt-4">
                <p className="text-xs font-sans uppercase tracking-wider text-copper mb-1">{artist.region}</p>
                <p className="font-serif text-xl text-espresso group-hover:text-copper transition-colors duration-300 ease-premium">
                  {artist.name}
                </p>
                <p className="mt-1 text-sm text-espresso-soft">{artist.tagline}</p>
                <div className="mt-3 flex gap-2">
                  {artist.verified && (
                    <Badge tone="copper" icon={<BadgeCheck size={12} strokeWidth={1.5} />}>
                      Verified
                    </Badge>
                  )}
                  {artist.galleryRepresented && <Badge tone="outline">Gallery Represented</Badge>}
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

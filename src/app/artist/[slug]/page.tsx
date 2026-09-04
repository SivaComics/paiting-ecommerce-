import { notFound } from "next/navigation";
import { artists, getArtistBySlug } from "@/lib/data/artists";
import { getArtworksByArtist } from "@/lib/data/artworks";
import { Badge } from "@/components/ui/Badge";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { StudioGallery } from "@/components/artist/StudioGallery";
import { VideoEmbed } from "@/components/artist/VideoEmbed";
import { ArtistTimeline } from "@/components/artist/ArtistTimeline";
import { PressMentions } from "@/components/artist/PressMentions";
import { ArtistWorksGrid } from "@/components/artist/ArtistWorksGrid";
import { RevealOnScroll } from "@/components/ui/motion";
import { BadgeCheck } from "lucide-react";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return {
    title: `${artist.name} — Auréline`,
    description: artist.tagline,
  };
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const works = getArtworksByArtist(artist.id);

  return (
    <div>
      <section className="relative h-[56vh] min-h-[380px] w-full bg-espresso">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.portraitImage}
          alt={artist.name}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-espresso-veil" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end max-w-7xl mx-auto px-6 pb-12">
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-cream/80 mb-3">{artist.region}</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-cream">{artist.name}</h1>
          <p className="mt-3 text-cream/85 max-w-xl">{artist.tagline}</p>
          <div className="mt-4 flex gap-2">
            {artist.verified && (
              <Badge tone="copper" icon={<BadgeCheck size={13} strokeWidth={1.5} />}>
                Verified Artist
              </Badge>
            )}
            {artist.galleryRepresented && <Badge tone="outline">Gallery Represented</Badge>}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16">
          <div>
            {artist.bio.map((paragraph, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <p className="text-espresso-soft leading-relaxed mb-5">{paragraph}</p>
              </RevealOnScroll>
            ))}
          </div>
          <div>
            <VideoEmbed posterImage={artist.studioPhotos[0]} artistName={artist.name} />
          </div>
        </div>

        <HairlineDivider className="my-16" accent />

        <RevealOnScroll>
          <p className="text-xs font-sans uppercase tracking-wider text-copper mb-6">In the Studio</p>
        </RevealOnScroll>
        <StudioGallery photos={artist.studioPhotos} artistName={artist.name} />

        <HairlineDivider className="my-16" accent />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16">
          <div>
            <p className="text-xs font-sans uppercase tracking-wider text-copper mb-6">Career</p>
            <ArtistTimeline entries={artist.timeline} />
          </div>
          <div>
            <p className="text-xs font-sans uppercase tracking-wider text-copper mb-6">In the Press</p>
            <PressMentions mentions={artist.pressMentions} />
          </div>
        </div>

        <HairlineDivider className="my-16" accent />

        <p className="text-xs font-sans uppercase tracking-wider text-copper mb-6">Available Works</p>
        <ArtistWorksGrid works={works} />
      </div>
    </div>
  );
}

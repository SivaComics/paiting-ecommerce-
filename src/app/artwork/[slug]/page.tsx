import { notFound } from "next/navigation";
import Link from "next/link";
import { artworks, getArtworkBySlug } from "@/lib/data/artworks";
import { getArtistById } from "@/lib/data/artists";
import { formatArtworkDetails } from "@/lib/format";
import { ARTIST_NAME, SITE_NAME } from "@/lib/site";
import { ZoomableImage } from "@/components/artwork/ZoomableImage";
import { ProvenanceAccordion } from "@/components/artwork/ProvenanceAccordion";
import { PurchasePanel } from "@/components/artwork/PurchasePanel";
import { PaintingStory } from "@/components/artwork/PaintingStory";
import { RoomPreviewTool } from "@/components/artwork/RoomPreviewTool";
import { HairlineDivider } from "@/components/ui/HairlineDivider";
import { RevealOnScroll } from "@/components/ui/motion";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};
  const artist = getArtistById(artwork.artistId);
  return {
    title: `${artwork.reference} by ${artist?.name} — ${SITE_NAME}`,
    description:
      artwork.description || artwork.observation || `${artwork.reference}, an original painting by ${ARTIST_NAME}.`,
  };
}

export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const artist = getArtistById(artwork.artistId);
  const details = formatArtworkDetails(artwork);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <p className="text-xs text-espresso-soft mb-10">
        <Link href="/#paintings" className="hover:text-copper-deep transition-colors duration-300 ease-premium">
          The Paintings
        </Link>{" "}
        / {artwork.reference}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.8fr] gap-12">
        <RevealOnScroll>
          <ZoomableImage
            images={artwork.images}
            aspect={artwork.imageAspect}
            alt={`${artwork.reference} by ${ARTIST_NAME}`}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-copper-deep mb-3">{artwork.reference}</p>
          <h1 className="font-serif text-3xl text-espresso text-balance-pretty">{artwork.title}</h1>
          {artist && (
            <Link
              href="/#work"
              className="mt-2 inline-block font-serif text-lg text-espresso-soft hover:text-copper-deep transition-colors duration-300 ease-premium"
            >
              {artist.name}
            </Link>
          )}

          <HairlineDivider className="my-6" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="text-espresso-soft">Medium</dt>
              <dd className="text-espresso text-right">{details.medium}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-espresso-soft">Dimensions</dt>
              <dd className="text-espresso text-right">{details.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-espresso-soft">Year</dt>
              <dd className="text-espresso text-right">{details.year}</dd>
            </div>
            {artwork.edition && (
              <div className="flex justify-between gap-6">
                <dt className="text-espresso-soft">Edition</dt>
                <dd className="text-espresso text-right">{artwork.edition}</dd>
              </div>
            )}
          </dl>

          <HairlineDivider className="my-6" />

          {artwork.description && (
            <p className="text-base text-espresso-soft leading-relaxed">{artwork.description}</p>
          )}
          <PaintingStory artwork={artwork} />

          <ProvenanceAccordion
            provenance={artwork.provenance}
            exhibitionHistory={artwork.exhibitionHistory}
          />

          <HairlineDivider className="my-6" />

          <RoomPreviewTool
            artworkImage={artwork.images[0]}
            artworkAspect={artwork.imageAspect}
            artworkTitle={artwork.reference}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <PurchasePanel artwork={artwork} />
        </RevealOnScroll>
      </div>
    </div>
  );
}

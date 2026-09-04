import { notFound } from "next/navigation";
import Link from "next/link";
import { artworks, getArtworkBySlug } from "@/lib/data/artworks";
import { getArtistById } from "@/lib/data/artists";
import { formatDimensions } from "@/lib/format";
import { ZoomableImage } from "@/components/artwork/ZoomableImage";
import { ProvenanceAccordion } from "@/components/artwork/ProvenanceAccordion";
import { PurchasePanel } from "@/components/artwork/PurchasePanel";
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
    title: `${artwork.title} by ${artist?.name} — Auréline`,
    description: artwork.description,
  };
}

export default async function ArtworkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const artist = getArtistById(artwork.artistId);
  const artworkAspect = artwork.dimensions.width / artwork.dimensions.height;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-xs text-espresso-soft mb-8">
        <Link href="/discover" className="hover:text-copper transition-colors duration-300 ease-premium">
          Discover
        </Link>{" "}
        / {artwork.title}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.8fr] gap-12">
        <RevealOnScroll>
          <ZoomableImage
            images={artwork.images}
            alt={`${artwork.title}, ${artwork.year}, ${artwork.medium.toLowerCase()} by ${artist?.name ?? ""}`}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <p className="text-xs font-sans uppercase tracking-wider text-copper mb-2">{artwork.medium}</p>
          <h1 className="font-serif text-3xl text-espresso text-balance-pretty">{artwork.title}</h1>
          {artist && (
            <Link
              href={`/artist/${artist.slug}`}
              className="mt-2 inline-block font-serif text-lg text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
            >
              {artist.name}
            </Link>
          )}
          <p className="mt-1 text-sm text-espresso-soft">{artwork.year}</p>

          <HairlineDivider className="my-6" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-espresso-soft">Medium</dt>
              <dd className="text-espresso text-right">{artwork.materials}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-espresso-soft">Dimensions</dt>
              <dd className="text-espresso text-right">{formatDimensions(artwork.dimensions)}</dd>
            </div>
            {artwork.edition && (
              <div className="flex justify-between">
                <dt className="text-espresso-soft">Edition</dt>
                <dd className="text-espresso text-right">{artwork.edition}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-espresso-soft">Region</dt>
              <dd className="text-espresso text-right">{artwork.region}</dd>
            </div>
          </dl>

          <HairlineDivider className="my-6" />

          <p className="text-sm text-espresso-soft leading-relaxed">{artwork.description}</p>

          <ProvenanceAccordion
            provenance={artwork.provenance}
            exhibitionHistory={artwork.exhibitionHistory}
          />

          <HairlineDivider className="my-6" />

          <RoomPreviewTool
            artworkImage={artwork.images[0]}
            artworkAspect={artworkAspect}
            artworkTitle={artwork.title}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <PurchasePanel artwork={artwork} />
        </RevealOnScroll>
      </div>
    </div>
  );
}

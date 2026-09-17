import { Artist } from "./types";
import { artistPortrait } from "./painting-images";
import { ARTIST_NAME } from "@/lib/site";
import { ARTIST_BIO } from "./artist-words";

/**
 * The site represents a single artist. Biographical facts come from the
 * yathraemagazine.com article (see artist-words.ts); the client PDFs have none.
 */
export const artists: Artist[] = [
  {
    id: "artist-balu",
    slug: "balu",
    name: ARTIST_NAME,
    region: "Chennai, India",
    tagline: "The Path Through Simplicity",
    bio: ARTIST_BIO,
    portraitImage: artistPortrait,
    studioPhotos: [],
    timeline: [],
    pressMentions: [],
    verified: false,
    galleryRepresented: false,
  },
];

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

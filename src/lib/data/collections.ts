import { Collection } from "./types";

// The previous curated collections grouped the fictional marketplace catalogue.
// None exist for Mr. Balu's work yet; add them here if the client wants any.
export const collections: Collection[] = [];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

import { Collection } from "./types";
import { artworkImage } from "@/lib/placeholder-art";

export const collections: Collection[] = [
  {
    id: "col-emerging-voices",
    slug: "emerging-voices",
    title: "Emerging Voices",
    curatorialBlurb:
      "New and rising talents, selected for their first solo shows, sold-out debuts, and studios worth watching before the rest of the market catches on.",
    coverImage: artworkImage("col-emerging-voices", ["#7A3B5E", "#C9975C", "#3E2A4A"]),
    artworkIds: ["aw-15", "aw-16", "aw-19", "aw-21", "aw-22", "aw-23", "aw-24"],
  },
  {
    id: "col-abstract-contemporary",
    slug: "abstract-contemporary",
    title: "Abstract Contemporary",
    curatorialBlurb:
      "Color, gesture, and geometry from painters redefining abstraction — from layered color-field canvases to gold-leafed geometric constructions.",
    coverImage: artworkImage("col-abstract-contemporary", ["#7C8FA6", "#B87333", "#EAE3D6"]),
    artworkIds: ["aw-01", "aw-02", "aw-03", "aw-10", "aw-11", "aw-14", "aw-18"],
  },
  {
    id: "col-sculptural-forms",
    slug: "sculptural-forms",
    title: "Sculptural Forms",
    curatorialBlurb:
      "Bronze, reclaimed steel, carved wood, and fired ceramic — three-dimensional work built to hold a room and reward a slow walk around it.",
    coverImage: artworkImage("col-sculptural-forms", ["#5A5450", "#B0A99B", "#2A2420"]),
    artworkIds: ["aw-04", "aw-05", "aw-06", "aw-12", "aw-13", "aw-16", "aw-17"],
  },
  {
    id: "col-photography-after-dark",
    slug: "photography-after-dark",
    title: "Photography After Dark",
    curatorialBlurb:
      "Long exposures, night streets, and quiet architecture — analog and large-format photography exploring what the world looks like after the light goes down.",
    coverImage: artworkImage("col-photography-after-dark", ["#26324A", "#8A8F99", "#0E1116"]),
    artworkIds: ["aw-07", "aw-08", "aw-09", "aw-20", "aw-21"],
  },
  {
    id: "col-editors-picks",
    slug: "editors-picks",
    title: "Editor's Picks",
    curatorialBlurb: "This week's standout selections, chosen by Auréline's curatorial team.",
    coverImage: artworkImage("col-editors-picks", ["#B87333", "#2A2420", "#F5EDE3"]),
    artworkIds: ["aw-01", "aw-04", "aw-07", "aw-10", "aw-14", "aw-18", "aw-22"],
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export interface PlacementSuggestion {
  /** Bounding box for the suggested artwork placement, as fractions (0-1) of the room image. */
  box: { x: number; y: number; width: number; height: number };
  toneNote: string;
  confidence: number;
  source: "ai" | "fallback";
}

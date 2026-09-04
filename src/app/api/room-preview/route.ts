import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { PlacementSuggestion } from "@/lib/room-preview/types";

export const runtime = "nodejs";

const FALLBACK: PlacementSuggestion = {
  box: { x: 0.3, y: 0.22, width: 0.4, height: 0.4 },
  toneNote: "Centered placement — adjust manually with the handles below.",
  confidence: 0,
  source: "fallback",
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function parsePlacement(text: string): PlacementSuggestion | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]);
    const box = parsed.box;
    if (
      !box ||
      typeof box.x !== "number" ||
      typeof box.y !== "number" ||
      typeof box.width !== "number" ||
      typeof box.height !== "number"
    ) {
      return null;
    }
    const width = clamp(box.width, 0.08, 0.95);
    const height = clamp(box.height, 0.08, 0.95);
    const x = clamp(box.x, 0, 1 - width);
    const y = clamp(box.y, 0, 1 - height);
    return {
      box: { x, y, width, height },
      toneNote: typeof parsed.toneNote === "string" ? parsed.toneNote.slice(0, 240) : "",
      confidence: typeof parsed.confidence === "number" ? clamp(parsed.confidence, 0, 1) : 0.5,
      source: "ai",
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { imageBase64, mediaType, artworkAspectRatio } = (body ?? {}) as {
    imageBase64?: string;
    mediaType?: string;
    artworkAspectRatio?: number;
  };

  if (!imageBase64 || typeof imageBase64 !== "string") {
    return NextResponse.json({ error: "Missing `imageBase64`." }, { status: 400 });
  }

  const allowedMediaTypes = ["image/jpeg", "image/png", "image/webp"] as const;
  const resolvedMediaType = allowedMediaTypes.includes(mediaType as (typeof allowedMediaTypes)[number])
    ? (mediaType as (typeof allowedMediaTypes)[number])
    : "image/jpeg";

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      placement: FALLBACK,
      note: "AI placement isn't connected in this environment — showing a default centered position.",
    });
  }

  const client = new Anthropic();

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5",
      max_tokens: 500,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: resolvedMediaType, data: imageBase64 },
            },
            {
              type: "text",
              text: `This is a photo of a room. A collector wants to preview a piece of art (aspect ratio ${
                artworkAspectRatio?.toFixed(2) ?? "1.00"
              }, width/height) hung on a wall in this photo.

Identify the single best flat wall region to place it — well-lit, uncluttered, at a natural hanging height — and reply with ONLY a JSON object (no prose, no markdown fences) in this exact shape:
{"box": {"x": <0-1 left offset>, "y": <0-1 top offset>, "width": <0-1 fraction of image width>, "height": <0-1 fraction of image height>}, "toneNote": "<one short sentence on the wall color/lighting and how the artwork will read there>", "confidence": <0-1>}

The box must preserve roughly the given aspect ratio and fit fully within the image bounds.`,
            },
          ],
        },
      ],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        placement: FALLBACK,
        note: "AI placement declined for this image — showing a default centered position.",
      });
    }

    const textBlock = response.content.find(
      (b): b is Anthropic.Beta.BetaTextBlock => b.type === "text"
    );
    const placement = textBlock ? parsePlacement(textBlock.text) : null;

    return NextResponse.json({
      placement: placement ?? FALLBACK,
      note: placement ? undefined : "Couldn't read a clear placement suggestion — showing a default centered position.",
    });
  } catch {
    return NextResponse.json({
      placement: FALLBACK,
      note: "AI placement is temporarily unavailable — showing a default centered position.",
    });
  }
}

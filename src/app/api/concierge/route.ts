import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { conciergeSystemPrompt } from "@/lib/concierge/system-prompt";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (v.role === "user" || v.role === "assistant") && typeof v.content === "string";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages)) {
    return new Response("Expected a `messages` array.", { status: 400 });
  }

  const messages: Anthropic.MessageParam[] = rawMessages
    .filter(isChatMessage)
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content }));

  if (messages.length === 0) {
    return new Response("No valid messages provided.", { status: 400 });
  }

  const encoder = new TextEncoder();

  if (!process.env.ANTHROPIC_API_KEY) {
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            "Ask Auré isn't connected yet in this environment — an ANTHROPIC_API_KEY needs to be configured. In the meantime, feel free to browse Discover, or reach a collector advisor directly."
          )
        );
        controller.close();
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const client = new Anthropic();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.beta.messages.stream({
          model: "claude-opus-5",
          max_tokens: 1024,
          system: conciergeSystemPrompt,
          output_config: { effort: "low" },
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          messages,
        });

        anthropicStream.on("text", (delta) => {
          controller.enqueue(encoder.encode(delta));
        });

        const finalMessage = await anthropicStream.finalMessage();
        if (finalMessage.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "I'm not able to help with that particular request, but I'm glad to help you find a piece, or answer a question about authenticity, shipping, or returns."
            )
          );
        }
        controller.close();
      } catch {
        controller.enqueue(
          encoder.encode(
            "I'm having trouble connecting just now — please try again in a moment, or reach a collector advisor directly."
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

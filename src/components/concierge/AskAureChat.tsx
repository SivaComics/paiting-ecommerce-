"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { clsx } from "clsx";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour — I'm Auré, your art advisor. Tell me about a space you're decorating, a mood you're chasing, or a budget in mind, and I'll suggest a few pieces. I can also answer questions about authenticity, shipping, or returns.",
};

export function AskAureChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantText = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "I'm having trouble connecting just now — please try again in a moment.",
        };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-espresso text-cream px-5 py-3.5 shadow-lg",
          "hover:bg-copper hover:-translate-y-0.5 hover:shadow-copper-glow transition-all duration-300 ease-premium",
          open && "hidden"
        )}
        aria-label="Open Ask Auré, your AI art advisor"
      >
        <Sparkles size={18} strokeWidth={1.5} />
        <span className="text-sm font-sans uppercase tracking-wider">Ask Auré</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Ask Auré chat">
          <button
            type="button"
            className="absolute inset-0 bg-espresso/30"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          />
          <div
            ref={panelRef}
            className="relative h-full w-full max-w-md bg-cream border-l border-hairline flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Sparkles size={18} strokeWidth={1.5} className="text-copper" />
                <p className="font-serif text-lg text-espresso">Ask Auré</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-espresso-soft hover:text-copper transition-colors duration-300 ease-premium"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={clsx(
                    "max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "assistant"
                      ? "bg-cream-deep text-espresso mr-auto"
                      : "bg-espresso text-cream ml-auto"
                  )}
                >
                  {m.content || (isStreaming && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="border-t border-hairline p-4 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a piece, a mood, a budget…"
                className="flex-1 bg-transparent border border-hairline px-4 py-2.5 text-sm text-espresso placeholder:text-espresso-soft focus:outline-none focus:border-copper"
                aria-label="Message to Ask Auré"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="bg-espresso text-cream p-2.5 disabled:opacity-40 hover:bg-copper transition-colors duration-300 ease-premium"
                aria-label="Send message"
              >
                <Send size={16} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

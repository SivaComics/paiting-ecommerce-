import { PressMention } from "@/lib/data/types";
import { Quote } from "lucide-react";

export function PressMentions({ mentions }: { mentions: PressMention[] }) {
  if (mentions.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {mentions.map((m, i) => (
        <blockquote key={i} className="border-l-2 border-copper pl-5">
          <Quote size={16} strokeWidth={1.5} className="text-copper mb-2" />
          <p className="font-serif text-lg text-espresso leading-snug mb-2">&ldquo;{m.quote}&rdquo;</p>
          <footer className="text-xs uppercase tracking-wider text-espresso-soft">
            {m.outlet}, {m.year}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

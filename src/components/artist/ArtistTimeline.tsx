import { TimelineEntry } from "@/lib/data/types";

export function ArtistTimeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-hairline pl-8 space-y-8">
      {entries.map((e, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-copper" />
          <p className="text-xs font-sans uppercase tracking-wider text-copper mb-1">{e.year}</p>
          <p className="font-serif text-lg text-espresso mb-1">{e.title}</p>
          <p className="text-sm text-espresso-soft leading-relaxed">{e.description}</p>
        </li>
      ))}
    </ol>
  );
}

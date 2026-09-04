"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { ProvenanceEntry } from "@/lib/data/types";

function Section({ title, entries }: { title: string; entries: ProvenanceEntry[] }) {
  const [open, setOpen] = useState(false);

  if (entries.length === 0) return null;

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-sans uppercase tracking-wider text-espresso transition-colors duration-300 ease-premium group-hover:text-copper">
          {title}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={clsx(
            "text-espresso-soft transition-all duration-300 ease-premium group-hover:text-copper",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <ul className="pb-4 space-y-3">
          {entries.map((e, i) => (
            <li key={i} className="flex gap-4 text-sm">
              <span className="text-copper w-14 flex-shrink-0">{e.year}</span>
              <span className="text-espresso-soft">{e.event}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProvenanceAccordion({
  provenance,
  exhibitionHistory,
}: {
  provenance: ProvenanceEntry[];
  exhibitionHistory: ProvenanceEntry[];
}) {
  return (
    <div className="mt-2">
      <Section title="Provenance" entries={provenance} />
      <Section title="Exhibition History" entries={exhibitionHistory} />
    </div>
  );
}

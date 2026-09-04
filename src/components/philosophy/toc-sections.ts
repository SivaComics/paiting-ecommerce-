export interface TocSection {
  id: string;
  label: string;
}

// Intro and the closing pull-quote section are deliberately excluded — the
// TOC only covers the nine body sections between them.
export const TOC_SECTIONS: TocSection[] = [
  { id: "circle", label: "Circle" },
  { id: "triangle", label: "Triangle" },
  { id: "space", label: "Space" },
  { id: "sequence", label: "Sequence" },
  { id: "nine-colours", label: "Nine Colours" },
  { id: "yin-yang", label: "Yin-Yang" },
  { id: "five-elements", label: "Five Elements" },
  { id: "minimalism", label: "Minimalism" },
  { id: "two-paths", label: "Two Paths" },
];

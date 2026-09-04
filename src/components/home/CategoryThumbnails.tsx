/**
 * Hand-drawn (not data-URI generated) square category thumbnails for the
 * homepage "Discover Art" cards — distinct from the catalog's abstract
 * placeholder artwork imagery, styled to the site's cream/copper/espresso palette.
 */

function ThumbFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <rect width="96" height="96" fill="#F5EDE3" />
      {children}
    </svg>
  );
}

export function PaintingThumbnail() {
  return (
    <ThumbFrame>
      <rect x="14" y="14" width="68" height="68" fill="#FAF6F0" stroke="#2A2420" strokeWidth="2" />
      <rect x="14" y="14" width="68" height="68" fill="none" stroke="#B87333" strokeWidth="1" strokeOpacity="0.5" />
      <path
        d="M 22 62 C 32 40, 40 66, 50 46 C 58 30, 66 52, 76 38"
        fill="none"
        stroke="#B87333"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="34" cy="34" r="8" fill="#C9975C" opacity="0.55" />
      <circle cx="60" cy="60" r="6" fill="#2A2420" opacity="0.35" />
    </ThumbFrame>
  );
}

export function SculptureThumbnail() {
  return (
    <ThumbFrame>
      <rect x="18" y="76" width="60" height="6" fill="#2A2420" opacity="0.8" />
      <path d="M 40 76 L 36 40 L 48 22 L 60 40 L 56 76 Z" fill="#C9975C" />
      <path d="M 48 22 L 60 40 L 56 76 L 48 76 Z" fill="#8A6D4F" opacity="0.75" />
      <path d="M 40 76 L 36 40 L 48 22 L 48 76 Z" fill="#EAE3D6" opacity="0.5" />
      <ellipse cx="44" cy="34" rx="5" ry="9" fill="#FFFFFF" opacity="0.3" />
    </ThumbFrame>
  );
}

export function PhotographyThumbnail() {
  return (
    <ThumbFrame>
      <circle cx="48" cy="48" r="34" fill="#2A2420" opacity="0.06" />
      <rect x="20" y="36" width="56" height="38" rx="4" fill="#2A2420" />
      <rect x="38" y="28" width="20" height="10" rx="2" fill="#2A2420" />
      <circle cx="48" cy="55" r="13" fill="#F5EDE3" />
      <circle cx="48" cy="55" r="9" fill="#2A2420" />
      <circle cx="48" cy="55" r="5" fill="#B87333" />
      <circle cx="68" cy="42" r="2.5" fill="#C9975C" />
    </ThumbFrame>
  );
}

export function NewArrivalsThumbnail() {
  return (
    <ThumbFrame>
      <g transform="rotate(-8 48 48)">
        <path d="M 26 26 H 62 L 72 48 L 62 70 H 26 Z" fill="#B87333" />
        <circle cx="36" cy="36" r="4" fill="#FAF6F0" />
      </g>
      <path
        d="M 66 24 L 69 30 L 75 32 L 69 34 L 66 40 L 63 34 L 57 32 L 63 30 Z"
        fill="#2A2420"
        opacity="0.85"
      />
    </ThumbFrame>
  );
}

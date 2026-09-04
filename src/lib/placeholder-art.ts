/**
 * Deterministic, dependency-free "artwork" imagery.
 * Generates abstract SVG compositions from a seed + palette so every artwork,
 * portrait, and studio photo in the mock catalog renders consistently offline,
 * without relying on a third-party image host that may be unreachable or change.
 */

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type Style = "painterly" | "sculptural" | "photographic";

function paintStroke(rand: () => number, width: number, height: number, color: string, opacity: string): string {
  const x0 = rand() * width;
  const y0 = rand() * height;
  const x1 = x0 + (rand() - 0.5) * width * 0.7;
  const y1 = y0 + (rand() - 0.5) * height * 0.7;
  const cx = (x0 + x1) / 2 + (rand() - 0.5) * width * 0.3;
  const cy = (y0 + y1) / 2 + (rand() - 0.5) * height * 0.3;
  const strokeWidth = (0.03 + rand() * 0.07) * Math.min(width, height);
  return `<path d="M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}" stroke="${color}" stroke-width="${strokeWidth.toFixed(
    1
  )}" stroke-linecap="round" fill="none" opacity="${opacity}" />`;
}

export function artworkImage(
  seed: string,
  palette: string[],
  opts: { width?: number; height?: number; style?: Style } = {}
): string {
  const { width = 1200, height = 1500, style = "painterly" } = opts;
  const rand = mulberry32(hashSeed(seed));
  const colors = palette.length ? palette : ["#B87333", "#2A2420", "#F5EDE3"];
  const pick = () => colors[Math.floor(rand() * colors.length)];
  const bg1 = colors[colors.length - 1];
  const bg2 = colors[0];

  const softLayers: string[] = [];
  const crispLayers: string[] = [];
  let blurAmount = 18;

  if (style === "painterly") {
    const softCount = 4 + Math.floor(rand() * 3);
    for (let i = 0; i < softCount; i++) {
      const cx = rand() * width;
      const cy = rand() * height;
      const r = (0.2 + rand() * 0.35) * Math.max(width, height);
      softLayers.push(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${pick()}" opacity="${(0.3 + rand() * 0.4).toFixed(2)}" />`
      );
    }
    const strokeCount = 5 + Math.floor(rand() * 5);
    for (let i = 0; i < strokeCount; i++) {
      crispLayers.push(paintStroke(rand, width, height, pick(), (0.4 + rand() * 0.45).toFixed(2)));
    }
    const accentCount = 2 + Math.floor(rand() * 3);
    for (let i = 0; i < accentCount; i++) {
      const cx = rand() * width;
      const cy = rand() * height;
      const r = (0.04 + rand() * 0.1) * Math.max(width, height);
      crispLayers.push(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${pick()}" opacity="${(0.55 + rand() * 0.35).toFixed(2)}" />`
      );
    }
    blurAmount = 14;
  } else if (style === "sculptural") {
    blurAmount = 0;
    const shapeCount = 4 + Math.floor(rand() * 3);
    for (let i = 0; i < shapeCount; i++) {
      const cx = width * (0.25 + rand() * 0.5);
      const cy = height * (0.2 + rand() * 0.6);
      const rw = (0.2 + rand() * 0.3) * width;
      const rh = (0.2 + rand() * 0.3) * height;
      const rot = Math.floor(rand() * 60 - 30);
      const color = pick();
      const opacity = (0.5 + rand() * 0.4).toFixed(2);
      if (i % 2 === 0) {
        crispLayers.push(
          `<ellipse cx="${cx}" cy="${cy}" rx="${rw / 2}" ry="${rh / 2}" fill="${color}" opacity="${opacity}" transform="rotate(${rot} ${cx} ${cy})" />`
        );
      } else {
        crispLayers.push(
          `<rect x="${cx - rw / 2}" y="${cy - rh / 2}" width="${rw}" height="${rh}" fill="${color}" opacity="${opacity}" transform="rotate(${rot} ${cx} ${cy})" />`
        );
      }
    }
    // directional highlight to suggest studio lighting on a form
    crispLayers.push(
      `<ellipse cx="${width * 0.32}" cy="${height * 0.28}" rx="${width * 0.22}" ry="${height * 0.16}" fill="#FFFFFF" opacity="0.18" />`
    );
    crispLayers.push(
      `<ellipse cx="${width * 0.7}" cy="${height * 0.78}" rx="${width * 0.3}" ry="${height * 0.2}" fill="#000000" opacity="0.16" />`
    );
  } else {
    blurAmount = 0;
    for (let i = 0; i < 4; i++) {
      const cx = rand() * width;
      const cy = rand() * height * 0.6 + height * 0.1;
      const r = (0.18 + rand() * 0.25) * Math.max(width, height);
      softLayers.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${pick()}" opacity="${(0.2 + rand() * 0.3).toFixed(2)}" />`);
    }
    for (let i = 0; i < 3; i++) {
      const y = rand() * height;
      crispLayers.push(
        `<rect x="0" y="${y}" width="${width}" height="${(0.015 + rand() * 0.04) * height}" fill="${pick()}" opacity="${(0.18 + rand() * 0.22).toFixed(2)}" />`
      );
    }
  }

  const vignette =
    style !== "painterly"
      ? `<rect width="${width}" height="${height}" fill="url(#vignette)" />`
      : "";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
      <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
        <stop offset="60%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.28" />
      </radialGradient>
      ${blurAmount > 0 ? `<filter id="soften"><feGaussianBlur stdDeviation="${blurAmount}" /></filter>` : ""}
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <g ${blurAmount > 0 ? 'filter="url(#soften)"' : ""}>${softLayers.join("")}</g>
    <g>${crispLayers.join("")}</g>
    ${vignette}
    <rect width="${width}" height="${height}" fill="#2A2420" opacity="0.03" />
  </svg>`;

  return svgToDataUri(svg);
}

export function portraitImage(seed: string, palette: string[]): string {
  const rand = mulberry32(hashSeed(seed));
  const colors = palette.length ? palette : ["#C9975C", "#2A2420"];
  const width = 800;
  const height = 1000;
  const skin = colors[0];
  const bg = colors[colors.length - 1];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="pbg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${bg}" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#2A2420" stop-opacity="0.95" />
      </linearGradient>
      <filter id="psoften"><feGaussianBlur stdDeviation="6" /></filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#pbg)" />
    <g filter="url(#psoften)">
      <ellipse cx="${width / 2}" cy="${height * 0.42}" rx="${140 + rand() * 20}" ry="${170 + rand() * 20}" fill="${skin}" opacity="0.55" />
      <path d="M ${width * 0.15} ${height} C ${width * 0.2} ${height * 0.72}, ${width * 0.8} ${height * 0.72}, ${width * 0.85} ${height}" fill="${skin}" opacity="0.4" />
    </g>
  </svg>`;

  return svgToDataUri(svg);
}

export function scenePhoto(seed: string, palette: string[]): string {
  return artworkImage(seed, palette, { style: "photographic", width: 1400, height: 1000 });
}

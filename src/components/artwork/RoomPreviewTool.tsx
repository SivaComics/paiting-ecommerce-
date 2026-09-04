"use client";

import { useCallback, useRef, useState } from "react";
import { ImageUp, Loader2, Sparkles, RotateCw } from "lucide-react";
import { PlacementSuggestion } from "@/lib/room-preview/types";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

interface DragState {
  mode: "move" | "resize";
  startClientX: number;
  startClientY: number;
  startBox: { x: number; y: number; width: number; height: number };
  containerWidth: number;
  containerHeight: number;
}

export function RoomPreviewTool({
  artworkImage,
  artworkAspect,
  artworkTitle,
}: {
  artworkImage: string;
  artworkAspect: number;
  artworkTitle: string;
}) {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [naturalAspect, setNaturalAspect] = useState<number>(4 / 3);
  const [box, setBox] = useState({ x: 0.3, y: 0.22, width: 0.4, height: 0.4 / artworkAspect });
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyPlacement = useCallback(
    (placement: PlacementSuggestion) => {
      const width = placement.box.width;
      setBox({
        x: placement.box.x,
        y: placement.box.y,
        width,
        height: width / artworkAspect,
      });
      setNote(
        placement.source === "ai"
          ? placement.toneNote || "AI-suggested placement — drag, resize, or rotate to adjust."
          : placement.toneNote
      );
    },
    [artworkAspect]
  );

  async function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setRoomImage(dataUrl);

      const img = new window.Image();
      img.onload = () => setNaturalAspect(img.naturalWidth / img.naturalHeight || 4 / 3);
      img.src = dataUrl;

      const [, base64] = dataUrl.split(",");
      setLoading(true);
      try {
        const res = await fetch("/api/room-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageBase64: base64,
            mediaType: file.type || "image/jpeg",
            artworkAspectRatio: artworkAspect,
          }),
        });
        const data = await res.json();
        if (data.placement) applyPlacement(data.placement);
        else if (data.note) setNote(data.note);
      } catch {
        setNote("Couldn't reach the placement service — position it manually below.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  function onOverlayPointerDown(e: React.PointerEvent, mode: "move" | "resize") {
    e.preventDefault();
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    dragRef.current = {
      mode,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startBox: box,
      containerWidth: rect.width,
      containerHeight: rect.height,
    };
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onOverlayPointerMove(e: React.PointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = (e.clientX - drag.startClientX) / drag.containerWidth;
    const dy = (e.clientY - drag.startClientY) / drag.containerHeight;

    if (drag.mode === "move") {
      const width = drag.startBox.width;
      const height = drag.startBox.height;
      setBox({
        x: clamp(drag.startBox.x + dx, 0, 1 - width),
        y: clamp(drag.startBox.y + dy, 0, 1 - height),
        width,
        height,
      });
    } else {
      const width = clamp(drag.startBox.width + dx, 0.08, 0.9);
      const height = width / artworkAspect;
      setBox({
        x: clamp(drag.startBox.x, 0, 1 - width),
        y: clamp(drag.startBox.y, 0, 1 - height),
        width,
        height,
      });
    }
  }

  function onOverlayPointerUp() {
    dragRef.current = null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} strokeWidth={1.5} className="text-copper" />
        <p className="text-xs font-sans uppercase tracking-wider text-espresso">AI Room Preview</p>
      </div>

      {!roomImage ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-video border border-dashed border-hairline flex flex-col items-center justify-center gap-3 text-espresso-soft hover:border-copper hover:text-copper transition-colors duration-300 ease-premium"
        >
          <ImageUp size={28} strokeWidth={1.25} />
          <span className="text-sm">Upload a photo of your space</span>
        </button>
      ) : (
        <div>
          <div
            ref={containerRef}
            className="relative w-full select-none overflow-hidden bg-cream-deep"
            style={{ aspectRatio: naturalAspect }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={roomImage} alt="Your uploaded room" className="absolute inset-0 h-full w-full object-cover" draggable={false} />

            <div
              onPointerDown={(e) => onOverlayPointerDown(e, "move")}
              onPointerMove={onOverlayPointerMove}
              onPointerUp={onOverlayPointerUp}
              className="absolute cursor-move shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              style={{
                left: `${box.x * 100}%`,
                top: `${box.y * 100}%`,
                width: `${box.width * 100}%`,
                aspectRatio: artworkAspect,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artworkImage}
                alt={`${artworkTitle} previewed in your space`}
                className="h-full w-full object-cover pointer-events-none"
                draggable={false}
              />
              <div
                onPointerDown={(e) => onOverlayPointerDown(e, "resize")}
                onPointerMove={onOverlayPointerMove}
                onPointerUp={onOverlayPointerUp}
                className="absolute -bottom-1.5 -right-1.5 h-4 w-4 bg-cream border border-copper cursor-nwse-resize"
                aria-label="Resize artwork preview"
                role="slider"
                aria-valuenow={Math.round(box.width * 100)}
                tabIndex={0}
              />
            </div>

            {loading && (
              <div className="absolute inset-0 bg-espresso/40 flex items-center justify-center">
                <Loader2 size={28} className="text-cream animate-spin" />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <RotateCw size={14} strokeWidth={1.5} className="text-espresso-soft" />
            <input
              type="range"
              min={-20}
              max={20}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="flex-1 accent-copper"
              aria-label="Rotate artwork preview"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs uppercase tracking-wider text-espresso-soft hover:text-copper whitespace-nowrap transition-colors duration-300 ease-premium"
            >
              Change Photo
            </button>
          </div>

          {note && <p className="mt-2 text-xs text-espresso-soft italic">{note}</p>}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <p className="mt-3 text-xs text-espresso-soft">
        Claude analyzes your photo to suggest a starting position — drag, resize, and rotate to fine-tune. Your
        photo is sent only for this one-time analysis and isn&apos;t stored or saved to your account.
      </p>
    </div>
  );
}

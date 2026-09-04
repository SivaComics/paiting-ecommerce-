import { ZoomOnHover } from "@/components/ui/motion";

export function StudioGallery({ photos, artistName }: { photos: string[]; artistName: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((photo, i) => (
        <ZoomOnHover key={i} className={`relative bg-cream-deep ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={`${artistName}'s studio, photo ${i + 1}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </ZoomOnHover>
      ))}
    </div>
  );
}

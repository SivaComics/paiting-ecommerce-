import Link from "next/link";
import { followedArtists } from "@/lib/data/collector";
import { getArtistById } from "@/lib/data/artists";
import { Bell, BellOff } from "lucide-react";

export function FollowingTab() {
  if (followedArtists.length === 0) {
    return <p className="text-espresso-soft py-12 text-center">You aren&apos;t following any artists yet.</p>;
  }

  return (
    <div className="divide-y divide-hairline">
      {followedArtists.map((f) => {
        const artist = getArtistById(f.artistId);
        if (!artist) return null;
        return (
          <div
            key={f.artistId}
            className="flex items-center justify-between py-5 px-2 -mx-2 transition-colors duration-300 ease-premium hover:bg-cream-deep/40"
          >
            <Link href={`/artist/${artist.slug}`} className="flex items-center gap-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={artist.portraitImage}
                alt={artist.name}
                className="h-14 w-14 object-cover rounded-full"
              />
              <div>
                <p className="font-serif text-lg text-espresso group-hover:text-copper transition-colors duration-300 ease-premium">
                  {artist.name}
                </p>
                <p className="text-xs text-espresso-soft">{artist.region}</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-espresso-soft">
              {f.priceAlertsEnabled ? (
                <>
                  <Bell size={14} strokeWidth={1.5} className="text-copper" /> Price Alerts On
                </>
              ) : (
                <>
                  <BellOff size={14} strokeWidth={1.5} /> Price Alerts Off
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

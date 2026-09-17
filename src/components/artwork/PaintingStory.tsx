import { clsx } from "clsx";
import { Artwork } from "@/lib/data/types";
import { ARTICLE_SOURCE, ARTIST_QUOTES } from "@/lib/data/artist-words";
import { ARTIST_NAME } from "@/lib/site";

/**
 * What can be seen in a painting, and one of the artist's own published
 * statements beside it. The quote's caption says honestly what he was
 * speaking about, since no source explains any single painting.
 */
export function PaintingStory({ artwork, className }: { artwork: Artwork; className?: string }) {
  if (!artwork.observation && !artwork.artistQuote) return null;

  return (
    <div className={clsx("max-w-md space-y-8", className)}>
      {artwork.observation && (
        <div>
          <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">In the painting</p>
          <p className="mt-3 text-base leading-[1.85] text-espresso-soft">{artwork.observation}</p>
        </div>
      )}

      {artwork.artistQuote && (
        <figure>
          <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">In his words</p>
          <blockquote className="mt-3 font-serif text-xl font-light italic leading-snug text-espresso sm:text-[1.4rem]">
            &ldquo;{ARTIST_QUOTES[artwork.artistQuote.key]}&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-xs leading-relaxed text-espresso-soft">
            {ARTIST_NAME}, {artwork.artistQuote.about}.{" "}
            <a
              href={ARTICLE_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-copper/40 underline-offset-4 hover:text-copper-deep hover:decoration-copper transition-colors duration-300 ease-premium"
            >
              {ARTICLE_SOURCE.publication}, {ARTICLE_SOURCE.date}
            </a>
          </figcaption>
        </figure>
      )}
    </div>
  );
}

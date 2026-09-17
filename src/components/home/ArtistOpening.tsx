import Link from "next/link";
import { ARTIST_NAME } from "@/lib/site";
import { artistPortraitImage } from "@/lib/data/painting-images";
import { ARTICLE_SOURCE, ARTIST_INTRO, ARTIST_QUOTES } from "@/lib/data/artist-words";
import { FadeIn } from "@/components/ui/motion";
import { ScrollDrift } from "./scroll-effects";

// Copy sources:
// - line: "Two Approaches of Art – HS", The Path Through Simplicity
// - introduction and quote: the artist's own published words and facts
//   (yathraemagazine.com, see artist-words.ts)
// - portrait: yathraemagazine.com, "Renowned Artist K. Balasubramanian" (TBC: credit)
export function ArtistOpening() {
  return (
    <section aria-labelledby="artist-name" className="relative overflow-hidden">
      <OpeningMotif />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
          <ScrollDrift className="lg:col-span-7" distance={110} fadeTo={0.3}>
            <p className="flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.3em] text-copper-deep">
              <span className="copper-rule block w-10" aria-hidden="true" />
              Original Paintings
            </p>

            <h1
              id="artist-name"
              className="text-copper-metal mt-10 pb-3 font-serif text-[clamp(2.3rem,10.8vw,4.2rem)] font-light leading-[0.95] tracking-[-0.015em] sm:mt-12 sm:whitespace-nowrap sm:text-[4.6rem] lg:text-[4.1rem] xl:text-[4.8rem]"
            >
              {ARTIST_NAME}
            </h1>

            <p className="mt-6 max-w-md font-serif text-2xl font-light italic leading-snug text-espresso sm:mt-8 sm:text-3xl">
              Reality expressed through remarkably few elements.
            </p>

            <p className="mt-8 max-w-md text-base leading-[1.85] text-espresso-soft sm:text-[17px]">{ARTIST_INTRO}</p>

            <figure className="mt-12 max-w-lg">
              <span className="copper-rule block w-12" aria-hidden="true" />
              <blockquote className="mt-6 font-serif text-2xl font-light leading-snug text-espresso sm:text-[1.9rem]">
                &ldquo;{ARTIST_QUOTES.symbolsAndForms}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-sans uppercase tracking-[0.28em] text-espresso-soft">
                {ARTIST_NAME} ·{" "}
                <a
                  href={ARTICLE_SOURCE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-copper-deep transition-colors duration-300 ease-premium"
                >
                  {ARTICLE_SOURCE.publication}
                </a>
              </figcaption>
            </figure>

            <Link
              href="#paintings"
              className="group mt-12 inline-flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.28em] text-espresso-soft hover:text-copper-deep transition-colors duration-700 ease-premium"
            >
              <span
                className="copper-rule block w-10 transition-all duration-700 ease-premium group-hover:w-16"
                aria-hidden="true"
              />
              View the paintings
            </Link>
          </ScrollDrift>

          {/* The artist, hung on the right under the copper light. */}
          <FadeIn delay={0.25} className="lg:col-span-5">
            <ScrollDrift distance={-70}>
              <figure className="mx-auto w-full max-w-[380px] lg:mr-0 lg:ml-auto">
                <div className="copper-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artistPortraitImage.src}
                    alt={`${ARTIST_NAME}, the artist`}
                    className="block h-auto w-full object-cover"
                    style={{ aspectRatio: String(artistPortraitImage.aspect) }}
                  />
                </div>
                <figcaption className="mt-6 flex items-baseline justify-between gap-4">
                  <span className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">The Artist</span>
                  <span className="font-serif text-lg italic text-copper-metal">{ARTIST_NAME}</span>
                </figcaption>
              </figure>
            </ScrollDrift>
          </FadeIn>
        </div>

        <a
          href="#work"
          className="group mx-auto mt-20 flex w-fit flex-col items-center gap-4 text-[10px] font-sans uppercase tracking-[0.35em] text-espresso-soft hover:text-copper-deep transition-colors duration-700 ease-premium sm:mt-24"
        >
          Scroll
          <span className="scroll-cue" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/**
 * Soft copper light on the right of the opening, taken from the client's
 * brushed-copper texture: a warm glow with a few blurred vertical light
 * bands and one darker band for depth, drifting very slowly. Decorative
 * only; styles live with the copper tokens in globals.css.
 */
function OpeningMotif() {
  return (
    <div aria-hidden="true" className="copper-light">
      <span className="copper-light__glow" />
      <span className="copper-light__band copper-light__band--a" />
      <span className="copper-light__band copper-light__band--b" />
      <span className="copper-light__band copper-light__band--shade" />
      <span className="copper-light__band copper-light__band--c" />
    </div>
  );
}

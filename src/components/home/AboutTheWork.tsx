import { RevealOnScroll } from "@/components/ui/motion";
import { SectionLabel } from "./SectionLabel";
import { GeometryPlate } from "./GeometryPlate";
import { LifeInPainting } from "./LifeInPainting";
import { DrawnRule, ScrollFillText } from "./scroll-effects";
import { ARTIST_NAME } from "@/lib/site";
import { ARTICLE_SOURCE, ARTIST_BIO } from "@/lib/data/artist-words";

// Every sentence here is drawn from the two client documents:
// "Artworks – Mr. Balu" (the HS commentary) and "Two Approaches of Art – HS"
// (The Path Through Simplicity). The commentary is explicit that the works
// are NOT illustrations of Aagamic symbols and NOT ritual Yantras — keep it so.
export function AboutTheWork() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <DrawnRule />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-36">
        {/* Centred on the page: "The Path Through" on one line, "Simplicity" beneath it. */}
        <div className="flex flex-col items-center text-center">
          <SectionLabel number="01" className="justify-center">
            The Work
          </SectionLabel>
          <h2
            id="work-heading"
            className="mt-10 flex flex-col items-center font-serif font-light leading-[1.02] text-espresso"
          >
            <span className="text-[2.6rem] sm:whitespace-nowrap sm:text-6xl lg:text-7xl">The Path Through</span>{" "}
            <span className="mt-1 text-[2.6rem] italic text-copper-metal sm:mt-2 sm:text-6xl lg:text-7xl">Simplicity</span>
          </h2>
          <p className="mt-8 font-serif text-xl font-light italic text-espresso-soft sm:text-2xl">
            &ldquo;The artwork reveals depth through reduction.&rdquo;
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <GeometryPlate />

            <figure className="mt-14">
              <span className="copper-rule block w-10" aria-hidden="true" />
              <blockquote className="mt-6 font-serif text-2xl font-light italic leading-snug text-espresso">
                &ldquo;An artwork is the meeting point of experience and expectation in the premise of cognition.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-sans uppercase tracking-[0.28em] text-espresso-soft">
                A definition from Harmonious Science
              </figcaption>
            </figure>

            <LifeInPainting />
          </div>

          <RevealOnScroll className="lg:col-span-7 lg:col-start-6">
            <div className="max-w-xl space-y-6 text-base leading-[1.85] text-espresso-soft sm:text-[17px]">
              <p className="font-serif text-2xl font-light leading-snug text-espresso sm:text-[1.7rem]">
                <ScrollFillText
                  text={`The paintings of ${ARTIST_NAME} are made from very few elements: circle, triangle, square, colour, axis, centre, boundary. Large areas of the surface are left open. There is almost no narrative, no landscape, no human drama.`}
                />
              </p>
              <p>
                Instead of accumulating complexity, the artist removes everything that appears unnecessary until
                only the essential relationships remain. Space is not empty; it participates in the composition.
                Silence becomes structure. Emptiness becomes presence.
              </p>
              <p>
                Seen through Harmonious Science (HS), the geometry does not describe an object. It behaves like a
                sutra — a compressed statement that unfolds through contemplation. Very little happens on the
                surface, yet as one keeps looking, perception changes.
              </p>
              <p>
                In the HS reading, these works are not illustrations of Aagamic symbols, and they are not Yantras in
                the traditional ritual sense. They appear to emerge from the same cognitive process that produced
                Aagamic symbolism.
              </p>
            </div>

            <figure className="mt-16 max-w-xl">
              <span className="copper-rule block w-10" aria-hidden="true" />
              <blockquote className="mt-8 font-serif text-3xl font-light italic leading-snug text-espresso sm:text-[2.2rem]">
                &ldquo;The painting is not an object. It is an event between geometry, space, colour, and the
                observer.&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-espresso-soft">
                <span lang="ta" className="text-copper-deep">
                  இது ஒரு நிகழ்வு
                </span>
                <span className="mx-2 text-copper-deep" aria-hidden="true">
                  ·
                </span>
                It is an event.
              </figcaption>
            </figure>

            <div className="mt-16 max-w-xl">
              <p className="text-[11px] font-sans uppercase tracking-[0.28em] text-copper-deep">About the artist</p>
              <div className="mt-3 space-y-4 text-base leading-[1.85] text-espresso-soft">
                {ARTIST_BIO.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-4 text-xs text-espresso-soft">
                Source:{" "}
                <a
                  href={ARTICLE_SOURCE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-copper/40 underline-offset-4 hover:text-copper-deep hover:decoration-copper transition-colors duration-300 ease-premium"
                >
                  {ARTICLE_SOURCE.publication}, {ARTICLE_SOURCE.date}
                </a>
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

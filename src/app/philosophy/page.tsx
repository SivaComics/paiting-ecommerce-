import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/motion";
import { PhilosophyToc, PhilosophyBackToTop } from "@/components/philosophy/PhilosophyToc";
import { DrawnShape } from "@/components/philosophy/DrawnShape";
import { SequenceDiagram } from "@/components/philosophy/SequenceDiagram";
import { NineColoursIllustration } from "@/components/philosophy/NineColoursIllustration";
import { YinYangIllustration } from "@/components/philosophy/YinYangIllustration";
import { PanchaBhuthaBands } from "@/components/philosophy/PanchaBhuthaBands";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `The Framework — ${SITE_NAME}`,
  description:
    "The artistic philosophy behind the collection: geometry, space, and the compressed cosmologies these paintings draw from.",
};

const sectionHeading = "font-serif text-3xl sm:text-4xl text-espresso text-balance-pretty";
const sectionBody = "text-espresso-soft leading-relaxed text-[15px] sm:text-base";

export default function PhilosophyPage() {
  return (
    <div className="bg-cream">
      {/* Intro — above the fold, no TOC entry */}
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <RevealOnScroll>
          <p className="mb-5 flex items-center justify-center gap-3 text-xs font-sans font-medium uppercase tracking-[0.25em] text-copper">
            <span className="h-px w-6 bg-copper" aria-hidden="true" />
            The Artistic Philosophy
          </p>
          <h1 className="font-serif text-5xl text-espresso sm:text-6xl">The Framework</h1>
          <p className="mt-8 text-base leading-relaxed text-espresso-soft sm:text-lg">
            These paintings are read here through two lenses: Harmonious Science and the Aagama tradition. Not as
            decoration, and not as illustrations of religious symbols — but as arrangements that appear to come from
            the same intuitive process that produced those older symbols. The question this page asks is not &ldquo;what
            does the symbol mean,&rdquo; but &ldquo;what does looking at this do to the mind.&rdquo;
          </p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[180px_1fr] xl:gap-24">
          <PhilosophyToc />

          <div className="flex flex-col gap-28 pb-32 sm:gap-36">
            {/* Circle */}
            <section id="circle" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
                  <div>
                    <h2 className={sectionHeading}>Circle</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      Nearly every painting holds a dominant circle. Not movement, not expansion — retention. A
                      stabilized field, energy that has ceased dispersing. No direction dominates; every point relates
                      equally. The circle is the geometry of equilibrium.
                    </p>
                  </div>
                  <DrawnShape shape="circle" className="mx-auto h-40 w-40 sm:h-56 sm:w-56" />
                </div>
              </RevealOnScroll>
            </section>

            {/* Triangle — mirrored layout */}
            <section id="triangle" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
                  <DrawnShape shape="triangle" className="mx-auto h-40 w-40 sm:order-1 sm:h-56 sm:w-56" />
                  <div className="sm:order-2">
                    <h2 className={sectionHeading}>Triangle</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      A point has no relation. A line has one. A triangle produces circulation — the moment three
                      relations exist, rotation becomes possible. It is the minimum geometry capable of sustaining
                      transformation. Not merely fire. Transformation itself.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* Space — full-width, centered, subtle texture */}
            <section id="space" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="bg-texture-dots rounded-sm py-20 text-center sm:py-28">
                  <div className="mx-auto max-w-xl px-6">
                    <h2 className={sectionHeading}>Space</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      Space is never empty. Across these works, most of the surface holds nothing — yet it is alive.
                      The background is not background. It behaves like Aakash: not emptiness, but the relational
                      field the symbols activate.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* The Sequence */}
            <section id="sequence" className="scroll-mt-32">
              <RevealOnScroll>
                <h2 className={`${sectionHeading} text-center`}>The Sequence</h2>
                <div className="mx-auto mt-14 max-w-4xl">
                  <SequenceDiagram />
                </div>
                <p className={`mx-auto mt-14 max-w-xl text-center ${sectionBody}`}>
                  The small triangle introduces direction. The circle retains. The empty field connects. The painting
                  stabilizes.
                </p>
              </RevealOnScroll>
            </section>

            {/* Nine Colours */}
            <section id="nine-colours" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
                  <div>
                    <h2 className={sectionHeading}>Nine Colours</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      One white circle above, nine coloured fields below — unity expressing itself through
                      qualitative diversity, then returning. Bindu, expansion, differentiation, return.
                    </p>
                  </div>
                  <NineColoursIllustration />
                </div>
              </RevealOnScroll>
            </section>

            {/* Yin-Yang */}
            <section id="yin-yang" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="flex flex-col items-center gap-8 text-center">
                  <YinYangIllustration />
                  <div className="max-w-xl">
                    <h2 className={sectionHeading}>Yin-Yang</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      The yin-yang symbol here occupies only the centre of the painting, never the whole. Duality is
                      not the whole universe — only the centre of interaction. Around it, everything remains balanced.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </section>

            {/* Pancha-bhutha / Five Elements */}
            <section id="five-elements" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
                  <div>
                    <h2 className={sectionHeading}>Pancha-bhutha</h2>
                    <p className={`mt-5 ${sectionBody}`}>
                      Five horizontal bands — not shown as Earth, Water, Fire, Air, Space as objects, but as levels:
                      gradients of organization, functional states of manifestation rather than physical substances.
                    </p>
                  </div>
                  <PanchaBhuthaBands />
                </div>
              </RevealOnScroll>
            </section>

            {/* Minimalism */}
            <section id="minimalism" className="scroll-mt-32">
              <RevealOnScroll>
                <div className="mx-auto max-w-xl text-center">
                  <h2 className={sectionHeading}>Minimalism</h2>
                  <p className={`mt-5 ${sectionBody}`}>
                    Only mature civilizations compress entire cosmologies into simple geometry — Om, Sri Chakra, the
                    Taijitu, the mandala. These paintings belong to that same family of compressed cosmology.
                  </p>
                </div>
              </RevealOnScroll>
            </section>

            {/* Two Paths — visually distinct comparison */}
            <section id="two-paths" className="scroll-mt-32">
              <RevealOnScroll>
                <h2 className={`${sectionHeading} text-center`}>Two Intuitive Modes of Artistic Cognition</h2>
                <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
                  <div className="border-t border-hairline pt-8 sm:border-t-0 sm:border-r sm:pr-16 sm:pt-0">
                    <p className="mb-4 text-xs font-sans font-medium uppercase tracking-[0.2em] text-copper">
                      The Path Through Complexity
                    </p>
                    <p className={sectionBody}>
                      Reality expressed through extraordinary richness — dense, layered, intersecting. Complexity is
                      not decorative; it is the language through which unity slowly becomes perceptible. Simplicity
                      lies within maximum complexity.
                    </p>
                  </div>
                  <div className="border-t border-hairline pt-8 sm:border-t-0 sm:pt-0">
                    <p className="mb-4 text-xs font-sans font-medium uppercase tracking-[0.2em] text-copper">
                      The Path Through Simplicity
                    </p>
                    <p className={sectionBody}>
                      Reality expressed through remarkably few elements — geometry, proportion, space, silence. Depth
                      is revealed through reduction, not accumulation.
                    </p>
                  </div>
                </div>
                <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-espresso-soft/80">
                  Neither is a comparison. One externalizes density, the other internalizes it. One speaks through
                  abundance, the other through restraint. Both converge on the same reality.
                </p>
              </RevealOnScroll>
            </section>

            <div className="xl:hidden">
              <PhilosophyBackToTop />
            </div>
          </div>
        </div>
      </div>

      {/* Closing — pull quote, no TOC entry */}
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-8 text-center sm:pb-36">
        <RevealOnScroll>
          <p className="font-serif text-2xl leading-snug text-espresso sm:text-3xl">
            &ldquo;These works do not attempt to represent reality; they attempt to stabilize the observer&apos;s
            cognition around the relationships from which reality continuously emerges.&rdquo;
          </p>
          <div className="mt-10">
            <Button href="/discover" variant="primary" size="lg">
              Discover the Collection
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

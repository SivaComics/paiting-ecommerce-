import { ARTIST_NAME, CONTACT_EMAIL, TBC, mailtoEnquiry } from "@/lib/site";
import { SectionLabel } from "./SectionLabel";
import { SequenceLine } from "./SequenceLine";
import { DrawnRule, ScrollFillText } from "./scroll-effects";

// The page ends on one continuous warm-charcoal band (this section and the
// footer), where the copper can carry more light than on the ivory ground.
// The `ends-dark` class tells the layout not to add a light gap before the
// footer. The closing sentence is the HS commentary's own one-sentence
// summary of the work, quoted exactly (including its spelling of "stabilize").
export function ClosingAndContact() {
  return (
    <div className="ends-dark section-night">
      <DrawnRule bright />

      <section aria-labelledby="sequence-heading" className="mx-auto max-w-6xl px-6 pt-28 sm:pt-36">
        <p
          id="sequence-heading"
          className="text-center text-[11px] font-sans uppercase tracking-[0.3em] text-copper-light"
        >
          From potential to unity
        </p>
        <div className="mt-14 sm:mt-16">
          <SequenceLine />
        </div>
      </section>

      <section aria-label="Closing statement">
        <figure className="mx-auto max-w-4xl px-6 pt-28 pb-32 text-center sm:pt-36 sm:pb-44">
          <svg aria-hidden="true" viewBox="0 0 48 48" className="mx-auto h-10 w-10">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="0.75" style={{ stroke: "var(--copper-light)" }} />
            <circle cx="24" cy="24" r="1.6" style={{ fill: "var(--copper-highlight)" }} />
          </svg>
          <blockquote className="mt-12 font-serif text-3xl font-light italic leading-snug text-cream sm:text-5xl sm:leading-[1.2]">
            <ScrollFillText
              dim={0.18}
              text="“These works do not attempt to represent reality; they attempt to stabilize the observer’s cognition around the fundamental relationships from which reality continuously emerges.”"
            />
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4 text-[11px] font-sans uppercase tracking-[0.28em] text-copper-light">
            <span className="copper-rule-bright block w-8" aria-hidden="true" />
            Harmonious Science (HS)
            <span className="copper-rule-bright block w-8" aria-hidden="true" />
          </figcaption>
        </figure>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="copper-rule-bright opacity-60" aria-hidden="true" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel number="04" dark>
                Contact
              </SectionLabel>
              <h2 id="contact-heading" className="mt-8 font-serif text-5xl font-light leading-[1.02] text-cream sm:text-6xl">
                Enquiries &amp; <span className="italic text-copper-metal-bright">Commissions</span>
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
              <p className="max-w-xl text-base leading-[1.85] text-cream/75 sm:text-[17px]">
                To acquire a painting, or to ask about a commission, please write.
              </p>
              <p className="mt-3 max-w-xl text-sm text-cream/55">{TBC.commissions}</p>

              <a
                href={mailtoEnquiry(`Enquiry — ${ARTIST_NAME}`)}
                className="copper-outline mt-10 inline-flex items-center justify-center px-8 py-4 text-[12px] font-sans uppercase tracking-[0.24em] text-cream hover:bg-copper/10 hover:text-copper-highlight transition-colors duration-700 ease-premium"
              >
                Write to {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

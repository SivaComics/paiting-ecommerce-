import Link from "next/link";
import { ReactNode } from "react";
import { ARTIST_NAME, CONTACT_EMAIL, NAV_LINKS as navLinks, SITE_NAME, mailtoEnquiry } from "@/lib/site";
import { AboutArtistButton } from "@/components/artist-panel/ArtistPanel";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block hover:text-copper-highlight transition-colors duration-500 ease-premium"
    >
      {children}
      <span className="copper-rule-bright absolute left-0 -bottom-0.5 w-0 transition-all duration-500 ease-premium group-hover:w-full" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-cream">
      <div className="copper-rule-bright" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6 py-20 flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-4xl font-light tracking-[0.04em] text-copper-metal-bright">{SITE_NAME}</p>
          <p className="mt-4 text-sm text-cream/60">Original paintings by {ARTIST_NAME}.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-4 text-[12px] font-sans uppercase tracking-[0.24em] text-cream/70 sm:items-end">
            {navLinks.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
            <li>
              <AboutArtistButton className="uppercase tracking-[0.24em] hover:text-copper-highlight transition-colors duration-500 ease-premium">
                About the artist
              </AboutArtistButton>
            </li>
            <li>
              <a
                href={mailtoEnquiry(`Enquiry — ${ARTIST_NAME}`)}
                className="normal-case tracking-normal text-sm hover:text-copper-highlight transition-colors duration-500 ease-premium"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 text-[11px] tracking-[0.12em] text-cream/40">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

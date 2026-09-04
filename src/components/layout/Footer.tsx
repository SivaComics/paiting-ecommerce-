import Link from "next/link";
import { ReactNode } from "react";
import { TrustStrip } from "./TrustStrip";
import { HairlineDivider } from "@/components/ui/HairlineDivider";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group relative inline-block hover:text-copper transition-colors duration-300 ease-premium">
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-copper transition-all duration-300 ease-premium group-hover:w-full" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-cream-deep">
      <TrustStrip />
      <div className="mx-auto max-w-7xl px-6 py-20 grid grid-cols-2 sm:grid-cols-4 gap-12">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-serif text-2xl text-espresso mb-3">Auréline</p>
          <span className="block h-px w-10 bg-copper mb-4" aria-hidden="true" />
          <p className="text-sm text-espresso-soft leading-relaxed">
            A curated marketplace for original paintings, sculpture, and photography from independent
            and gallery-represented artists worldwide.
          </p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-4">Discover</p>
          <ul className="space-y-3 text-sm text-espresso-soft">
            <li><FooterLink href="/discover">Browse All</FooterLink></li>
            <li><FooterLink href="/discover#collections">Collections</FooterLink></li>
            <li><FooterLink href="/dashboard">My Collection</FooterLink></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-4">Assurance</p>
          <ul className="space-y-3 text-sm text-espresso-soft">
            <li>Insured Worldwide Shipping</li>
            <li>14-Day Returns</li>
            <li>Third-Party Authentication</li>
            <li>Secure Escrow Payment</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-wider text-espresso mb-4">Advisory</p>
          <ul className="space-y-3 text-sm text-espresso-soft">
            <li>Ask Auré, our AI art advisor, is available in the corner of every page.</li>
            <li>Dedicated collector advisors available by request.</li>
          </ul>
        </div>
      </div>
      <HairlineDivider />
      <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-espresso-soft flex flex-col sm:flex-row justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} Auréline. All rights reserved.</p>
        <p>A prototype boutique art marketplace.</p>
      </div>
    </footer>
  );
}

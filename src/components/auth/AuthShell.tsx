import Link from "next/link";
import { ReactNode } from "react";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { artworkImage } from "@/lib/placeholder-art";
import { SITE_NAME } from "@/lib/site";

const showcaseImage = artworkImage("auth-showcase", ["#B87333", "#2A2420", "#C9975C", "#EAE3D6"], {
  style: "painterly",
  width: 1200,
  height: 1500,
});

const pillars = [
  { icon: BadgeCheck, label: "Every piece authenticated & certified" },
  { icon: Truck, label: "Insured, white-glove worldwide delivery" },
  { icon: ShieldCheck, label: "Secure, escrow-style payment protection" },
];

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden lg:block overflow-hidden bg-espresso">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={showcaseImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-espresso-aurora opacity-90" />
        <div className="relative z-10 flex h-full flex-col justify-between p-14">
          <Link href="/" className="font-serif text-2xl tracking-wide text-cream">
            {SITE_NAME}
          </Link>
          <div>
            <p className="font-serif text-3xl xl:text-4xl text-cream leading-snug text-balance-pretty max-w-md">
              &ldquo;Collecting should feel like discovery, not a transaction.&rdquo;
            </p>
            <p className="mt-4 text-sm text-cream/70 uppercase tracking-wider">
              The {SITE_NAME} Curatorial Team
            </p>
          </div>
          <ul className="space-y-4">
            {pillars.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-cream/85 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 border border-cream/20">
                  <Icon size={16} strokeWidth={1.5} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:py-20 bg-gradient-cream-blush">
        <FadeIn className="w-full max-w-sm">
          <Link href="/" className="lg:hidden font-serif text-2xl tracking-wide text-espresso block mb-10 text-center">
            {SITE_NAME}
          </Link>
          <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-copper mb-3 text-center lg:text-left">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso text-center lg:text-left text-balance-pretty">
            {title}
          </h1>
          <p className="mt-3 text-espresso-soft text-center lg:text-left">{subtitle}</p>

          <div className="mt-10">{children}</div>

          <div className="mt-8 text-center lg:text-left text-sm text-espresso-soft">{footer}</div>
        </FadeIn>
      </div>
    </div>
  );
}

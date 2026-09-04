import { ShieldCheck, Truck, BadgeCheck, Undo2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/motion";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Third-Party Authentication",
    description:
      "Every work is verified by an independent authentication partner before it ships, with a Certificate of Authenticity included.",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    description:
      "Fully insured, worldwide shipping, handled by fine-art logistics specialists from studio to your wall.",
  },
  {
    icon: Undo2,
    title: "14-Day Returns",
    description: "Live with a piece in your space. If it isn't right, return it within 14 days, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Escrow Payment",
    description: "Funds are held securely until your piece is authenticated and delivered to your door.",
  },
];

export function WhiteGlovePromise() {
  return (
    <section className="bg-gradient-aurora py-28">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="The Auréline Promise"
            title="Collecting, Made Confident"
            description="From authentication to your doorstep, every step is designed to feel as considered as the work itself."
            align="center"
            className="mx-auto"
          />
        </RevealOnScroll>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {pillars.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 0.08} className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream border border-hairline shadow-sm group-hover:shadow-premium group-hover:-translate-y-1 transition-all duration-500 ease-premium">
                <p.icon size={22} strokeWidth={1.5} className="text-copper" />
              </div>
              <p className="font-serif text-lg text-espresso mb-2">{p.title}</p>
              <p className="text-sm text-espresso-soft leading-relaxed">{p.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

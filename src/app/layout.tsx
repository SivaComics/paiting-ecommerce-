import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Italiana } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AskAureChat } from "@/components/concierge/AskAureChat";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { PageTransition } from "@/components/ui/motion";
import { LenisProvider } from "@/lib/lenis";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Decorative display fonts — scoped to a single phrase on the Gallery Intro's
// idle screen (see GalleryIntro.tsx) via CSS variable only. The site's body
// copy stays on Playfair Display + Inter everywhere else.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Auréline — Original Art from Independent & Gallery-Represented Artists",
  description:
    "A curated marketplace connecting discerning collectors with original paintings, sculpture, and photography, backed by authentication and white-glove delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${italiana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-espresso focus:text-cream focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <LenisProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main id="main-content" className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <AskAureChat />
            </CartProvider>
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

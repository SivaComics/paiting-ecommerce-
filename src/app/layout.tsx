import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Italiana } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { PageTransition } from "@/components/ui/motion";
import { LenisProvider } from "@/lib/lenis";
import { ARTIST_NAME, SITE_NAME } from "@/lib/site";

// Display serif for headings and the artist's name — a fine, high-contrast
// Garamond that reads as a gallery catalogue rather than a web page.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Body and label sans — geometric, echoing the circles and triangles in the
// paintings, and airy at wide letter-spacing for small uppercase labels.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

// Only used by the (unused) GalleryIntro component.
const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Paintings by ${ARTIST_NAME}`,
  description: `Original paintings by ${ARTIST_NAME}: minimal geometric fields of circle, triangle, colour and open space.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${italiana.variable} h-full antialiased`}
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
              <ScrollProgress />
              <Header />
              <main id="main-content" className="flex-1 pb-32 has-[.ends-dark]:pb-0">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

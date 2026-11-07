import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FooterTransition } from "@/components/page-chrome";
import { RouteProgress } from "@/components/route-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppDesk } from "@/components/whatsapp";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Eventures Club — Events and northern tours from Lahore",
    template: "%s — Eventures Club",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.name,
    title: "Eventures Club — Events and northern tours from Lahore",
    description: site.description,
    images: [{ url: "/brand/og-default.jpg", width: 1200, height: 630, alt: "Passu peaks, with the Eventures Club mark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventures Club",
    description: site.description,
    images: ["/brand/og-default.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F0E8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2">
          Skip to content
        </a>
        <SmoothScroll>
          <RouteProgress />
          <Header />
          <main id="content">{children}</main>
          <FooterTransition>
            <Footer />
          </FooterTransition>
          <WhatsAppDesk />
        </SmoothScroll>
      </body>
    </html>
  );
}

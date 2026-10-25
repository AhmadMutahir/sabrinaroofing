import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { brand, copy } from "@/lib/content";

/* Fonts are self-hosted (latin subset, ~96 KB total) — no third-party requests,
   no render-blocking Google Fonts, and metric-matched fallbacks avoid layout shift. */
const playfair = localFont({
  src: "../public/fonts/playfair-latin.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--font-playfair",
  fallback: ["Times New Roman", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
  preload: true,
});

const archivo = localFont({
  src: "../public/fonts/archivo-latin.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
  preload: true,
});

const manrope = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: copy.en.metaTitle,
    template: `%s | ${brand.short}`,
  },
  description: copy.en.metaDescription,
  applicationName: brand.name,
  keywords: [
    "Dallas roofing company",
    "roof replacement Dallas TX",
    "roof repair Dallas",
    "hail damage roof repair",
    "metal roofing Dallas",
    "roof inspection Dallas",
  ],
  category: "Roofing contractor",
  authors: [{ name: brand.name }],
  creator: brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US"],
    url: brand.url,
    siteName: brand.name,
    title: copy.en.metaTitle,
    description: copy.en.metaDescription,
    images: [
      {
        url: "/images/project-1.webp",
        width: 896,
        height: 1200,
        alt: "Recently completed architectural shingle roof in Dallas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.en.metaTitle,
    description: copy.en.metaDescription,
    images: ["/images/project-1.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1150ef",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": `${brand.url}/#business`,
  name: brand.name,
  alternateName: brand.short,
  url: brand.url,
  telephone: brand.phone,
  email: brand.email,
  image: `${brand.url}/images/hero-house.webp`,
  logo: `${brand.url}/icon.svg`,
  priceRange: "$$",
  foundingDate: String(brand.foundingYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address.street,
    addressLocality: brand.address.city,
    addressRegion: brand.address.region,
    postalCode: brand.address.postalCode,
    addressCountry: brand.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: 32.8123, longitude: -96.8067 },
  areaServed: [
    "Dallas",
    "Highland Park",
    "University Park",
    "Lakewood",
    "Preston Hollow",
    "Plano",
    "Richardson",
    "Irving",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof replacement" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Storm and hail damage repair" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof repair and maintenance" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Metal, tile and flat roofing" } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${archivo.variable} ${manrope.variable}`}
    >
      <head>
        <noscript>
          {/* Motion is an enhancement: without JS every word stays visible. */}
          <style>{`.word{opacity:1!important;filter:none!important}
.word-line{display:inline!important}
.latest__card,.service{opacity:1!important;transform:none!important}
.hero__house,.video-card{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

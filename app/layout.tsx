import type { Metadata } from 'next';
import {
  Anton,
  Playfair_Display,
  Montserrat,
  Sora,
  Bebas_Neue,
  Inter,
  Jost,
  Open_Sans,
  Roboto_Condensed,
} from 'next/font/google';
import './globals.css';
import { CookieBanner } from '@/components/CookieBanner';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/lib/site';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-playfair', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-montserrat', display: 'swap' });
const sora = Sora({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-sora', display: 'swap' });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jost', display: 'swap' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-opensans', display: 'swap' });
const robotoCond = Roboto_Condensed({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto-cond', display: 'swap' });

const fontVars = [
  anton.variable,
  playfair.variable,
  montserrat.variable,
  sora.variable,
  bebas.variable,
  inter.variable,
  jost.variable,
  openSans.variable,
  robotoCond.variable,
].join(' ');

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Fahrzeugfolierung Münster | Muster Werbetechnik',
    template: '%s | Muster Werbetechnik',
  },
  description:
    'Premium-Fahrzeugfolierung in Münster. Vollfolierung, Farbwechsel, Lackschutzfolie (PPF), Chrome-Delete & Werbebeschriftung — werterhaltend, rückstandslos entfernbar.',
  keywords: [
    'Fahrzeugfolierung Münster',
    'Auto folieren Münster',
    'Vollfolierung',
    'Carwrapping Münster',
    'Lackschutzfolie PPF Münster',
    'Werbebeschriftung Münster',
  ],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: site.url,
    siteName: site.name,
    title: 'Fahrzeugfolierung Münster | Muster Werbetechnik',
    description:
      'Premium-Folierung & Farbwechsel — werterhaltend, rückstandslos entfernbar. Studio in Münster.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    name: site.name,
    image: `${site.url}/og-image.jpg`,
    '@id': site.url,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: [site.instagram.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={fontVars}>
      <body className="font-inter">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Zum Inhalt springen
        </a>
        <SmoothScroll />
        <main id="main">{children}</main>
        <CookieBanner />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}

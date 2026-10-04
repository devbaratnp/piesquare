import type { Metadata } from 'next';
import { Libre_Baskerville, Nunito, Plus_Jakarta_Sans } from 'next/font/google';
import { getPublicContent } from '@/server/content';
import './globals.css';

const displaySerif = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700'],
});

const inter = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const plexMono = Nunito({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Pie Square Technologies | The signal that builds Nepal",
  description: 'Telecom infrastructure, optical fiber, renewable energy, and digital systems across Nepal.',
  metadataBase: new URL('https://piesquaretechnologies.com'),
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Pie Square Technologies | The signal that builds Nepal',
    description: 'Infrastructure, energy, and digital systems engineered for reliable nationwide connectivity.',
    url: 'https://piesquaretechnologies.com',
    siteName: 'Pie Square Technologies',
    type: 'website',
    images: [{ url: '/media/cinematic/H01-hero-nepal-tower.webp', width: 1672, height: 941, alt: 'Telecom tower at dusk in Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pie Square Technologies | The signal that builds Nepal',
    description: 'Infrastructure, energy, and digital systems engineered for reliable nationwide connectivity.',
    images: ['/media/cinematic/H01-hero-nepal-tower.webp'],
  },
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getPublicContent();
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pie Square Technologies',
    url: 'https://piesquaretechnologies.com',
    email: content.contact.email,
    telephone: content.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lalitpur',
      addressCountry: 'NP',
    },
  };

  return (
    <html lang="en" className={`${displaySerif.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
      </body>
    </html>
  );
}

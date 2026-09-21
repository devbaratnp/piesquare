import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Inter_Tight } from 'next/font/google';
import { siteContact } from '@/data/site';
import { CustomCursor } from '@/components/custom-cursor';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500', '600'],
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pie Square Technologies',
    url: 'https://piesquaretechnologies.com',
    email: siteContact.email,
    telephone: siteContact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lalitpur',
      addressCountry: 'NP',
    },
  };

  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

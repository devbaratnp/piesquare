import type { Metadata } from 'next';

export const siteUrl = 'https://piesquaretechnologies.com';
const defaultSocialImage = {
  url: '/media/cinematic/H01-hero-nepal-tower.webp',
  width: 1672,
  height: 941,
  alt: 'Telecom tower at dusk in Nepal',
};

type PageMetadataInput = Readonly<{
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}>;

export function buildPageMetadata({ title, description, path, image = defaultSocialImage.url, imageAlt = defaultSocialImage.alt }: PageMetadataInput): Metadata {
  const url = path === '/' ? siteUrl : `${siteUrl}${path}`;
  const socialImage = image === defaultSocialImage.url
    ? defaultSocialImage
    : { url: image, alt: imageAlt };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Pie Square Technologies',
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbJsonLd(crumbs: ReadonlyArray<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, siteUrl).toString(),
    })),
  };
}

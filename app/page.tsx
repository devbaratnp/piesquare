import { HomeExperience } from '@/components/home-experience';
import { getPublicContent } from '@/server/content';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: 'Pie Square Technologies | Building the Infrastructure That Keeps Nepal Connected',
  description: 'Integrated telecom, fiber, solar and IT infrastructure solutions delivered across Nepal.',
  path: '/',
});

export default async function Page() {
  const content = await getPublicContent();
  return <HomeExperience hero={content.hero} contact={content.contact} services={content.services} projects={content.projects} />;
}

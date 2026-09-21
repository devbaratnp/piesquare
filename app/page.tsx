import type { Metadata } from 'next';
import { HomeExperience } from '@/components/home-experience';

export const metadata: Metadata = {
  title: 'Pie Square Technologies | Building the Infrastructure That Keeps Nepal Connected',
  description: 'Integrated telecom, fiber, solar and IT infrastructure solutions delivered across Nepal.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return <HomeExperience />;
}

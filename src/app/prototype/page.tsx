import type { Metadata } from 'next';
import PrototypeGallery from '@/components/PrototypeGallery';

export const metadata: Metadata = {
  title: 'Resilient Explorations — A Life of Looking',
  description: 'A showcase of this stage’s exploration through image, gesture and object.',
};

export default function PrototypePage() {
  return <PrototypeGallery />;
}


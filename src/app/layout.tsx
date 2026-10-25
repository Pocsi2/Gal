import type { Metadata, Viewport } from 'next';
import './globals.css';
import GalleryMotion from '@/components/GalleryMotion';

export const metadata: Metadata = {
  title: 'Resilient Explorations',
  description: 'A showcase of this stage’s exploration through image, gesture and object.',
  openGraph: {
    title: 'Resilient Explorations',
    description: 'A showcase of this stage’s exploration through image, gesture and object.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#090909' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#exhibition">Skip to the exhibition</a>
        <GalleryMotion />
        {children}
      </body>
    </html>
  );
}

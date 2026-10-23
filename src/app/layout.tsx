import type { Metadata, Viewport } from 'next';
import './globals.css';
import GalleryMotion from '@/components/GalleryMotion';

export const metadata: Metadata = {
  title: 'Explorations — 2026',
  description: 'A showcase of this year’s exploration through image, gesture and object.',
  openGraph: {
    title: 'Explorations — 2026',
    description: 'A showcase of this year’s exploration through image, gesture and object.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#090909' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#showcase">Skip to the showcase</a>
        <GalleryMotion />
        {children}
      </body>
    </html>
  );
}

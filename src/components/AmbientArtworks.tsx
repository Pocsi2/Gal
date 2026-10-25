import ResponsiveImage from '@/components/ResponsiveImage';

export default function AmbientArtworks() {
  return (
    <div className="ambient-artworks" aria-hidden="true">
      <div className="ambient-artwork ambient-artwork--chore">
        <ResponsiveImage image={{ id: 'chore', alt: '' }} sizes="52vw" />
      </div>
      <div className="ambient-artwork ambient-artwork--one">
        <ResponsiveImage image={{ id: 'one', alt: '' }} sizes="52vw" />
      </div>
    </div>
  );
}

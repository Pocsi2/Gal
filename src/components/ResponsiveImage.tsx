import manifest from '@/content/generated-manifest.json';
import { withBasePath } from '@/lib/site-paths';

export type ResponsiveImageData = {
  id: string;
  alt: string;
};

export default function ResponsiveImage({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: ResponsiveImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const entry = manifest.images.find((candidate) => candidate.id === image.id);
  if (!entry) return null;
  const lastVariant = entry.variants[entry.variants.length - 1];
  const srcSet = entry.variants
    .map((variant) => `${withBasePath(variant.path)} ${variant.width}w`)
    .join(', ');

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Static export uses pre-generated responsive variants.
    <img
      className={className}
      src={withBasePath(lastVariant.path)}
      srcSet={srcSet}
      sizes={sizes}
      width={lastVariant.width}
      height={lastVariant.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}


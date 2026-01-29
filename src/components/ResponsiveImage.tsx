interface ResponsiveImageProps {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ResponsiveImage({ name, alt, className = '', priority = false }: ResponsiveImageProps) {
  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={`/images/mobile/${name}.webp`}
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`/images/tablet/${name}.webp`}
      />
      <img
        src={`/images/desktop/${name}.webp`}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}

import { useState } from 'react';
import { Footprints } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fallbackLabel?: string;
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-video',
  fallbackLabel,
  width,
  height,
  fetchPriority = 'auto',
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#141414] via-[#1A1610] to-[#0A0A0A] border border-[#D4AF37]/20 text-center p-6 ${aspectClassName} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
          <Footprints className="h-5 w-5" />
        </div>
        <p className="font-serif text-lg font-semibold text-[#FAFAFA]">
          {fallbackLabel || 'GIDDY MINE COLLECTIONS'}
        </p>
        <p className="mt-1 text-xs text-[#A3A3A3]">Home of Quality Footwear</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading={loading}
    />
  );
}

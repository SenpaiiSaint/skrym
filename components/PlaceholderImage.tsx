'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  title: string;
  className?: string;
  imageSrc?: string;
}

export default function PlaceholderImage({ title, className = '', imageSrc }: PlaceholderImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Generate a consistent color based on the title
  const hue = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  // Use imageSrc if provided, otherwise fallback to uploaded image
  const displayImage = imageSrc || imageUrl;

  return (
    <div className={`relative aspect-video ${className}`}>
      {displayImage ? (
        <Image
          src={displayImage}
          alt={title}
          width={1600}
          height={900}
          className="object-cover w-full h-full rounded"
          style={{ aspectRatio: '16/9' }}
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-br from-[hsl(${hue},70%,20%)] to-[hsl(${hue},70%,10%)] flex items-center justify-center`}>
          <span className="text-white/80 text-lg font-medium px-4 text-center">
            {title}
          </span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute bottom-2 right-2 bg-white/80 rounded px-2 py-1 text-xs cursor-pointer z-10"
        aria-label="Upload image"
      />
    </div>
  );
} 
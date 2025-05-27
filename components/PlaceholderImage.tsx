'use client';

interface PlaceholderImageProps {
  title: string;
  className?: string;
}

export default function PlaceholderImage({ title, className = '' }: PlaceholderImageProps) {
  // Generate a consistent color based on the title
  const hue = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  
  return (
    <div 
      className={`relative aspect-video bg-gradient-to-br from-[hsl(${hue},70%,20%)] to-[hsl(${hue},70%,10%)] ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/80 text-lg font-medium px-4 text-center">
          {title}
        </span>
      </div>
    </div>
  );
} 
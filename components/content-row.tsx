'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  image: string;
  rating: string;
  year: number;
  duration: string;
}

interface ContentRowProps {
  title: string;
  category: string;
}

export default function ContentRow({ title, category }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // This would typically come from an API
  const contentItems: ContentItem[] = Array(10).fill({
    id: '1',
    title: 'Sample Title',
    image: '/placeholder-thumbnail.jpg',
    rating: 'TV-MA',
    year: 2024,
    duration: '2h 15m'
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Content Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {contentItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={`/watch/${item.id}`}
            className="flex-none w-64 relative group/item"
          >
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
              
              {/* Hover Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span>{item.rating}</span>
                  <span>{item.year}</span>
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 
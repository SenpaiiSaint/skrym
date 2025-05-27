'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  const [isHovered, setIsHovered] = useState(false);

  // This would typically come from an API
  const featuredContent = {
    title: "Featured Title",
    description: "A compelling description of the featured content that hooks the viewer and makes them want to watch more.",
    image: "/placeholder-hero.jpg",
    videoUrl: "/trailer.mp4",
    rating: "TV-MA",
    year: 2024,
    duration: "2h 15m",
    genres: ["Action", "Drama", "Thriller"]
  };

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={featuredContent.image}
          alt={featuredContent.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div> 

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {featuredContent.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
              <span>{featuredContent.rating}</span>
              <span>{featuredContent.year}</span>
              <span>{featuredContent.duration}</span>
              <div className="flex space-x-2">
                {featuredContent.genres.map((genre) => (
                  <span key={genre} className="px-2 py-1 bg-white/20 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8">
              {featuredContent.description}
            </p>

            <div className="flex space-x-4">
              <Link
                href={`/watch/${featuredContent.videoUrl}`}
                className="flex items-center px-8 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <svg
                  className={`w-6 h-6 mr-2 transition-transform ${isHovered ? 'scale-110' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Play
              </Link>
              <button className="flex items-center px-8 py-3 bg-gray-600/50 text-white rounded-md font-medium hover:bg-gray-600/70 transition-colors">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
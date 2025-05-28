import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function HeroBanner() {
  const contents = await prisma.content.findMany({
    where: {
      isFeatured: true,
    },
  });

  if (!contents || contents.length === 0) {
    return null;
  }

  // Pick a random featured content to display
  const content = contents[Math.floor(Math.random() * contents.length)];

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.heroImage || "placeholder-hero.jpg"}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {content.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
              <span>{content.rating}</span>
              <span>{content.year}</span>
              <span>{content.duration}</span>
              {/* If adding genres to the model, render them here */}
            </div>

            <p className="text-lg text-gray-300 mb-8">{content.synopsis}</p>

            <div className="flex space-x-4">
              <Link
                href={content.trailerUrl ? `/watch/${content.trailerUrl}` : "#"}
                className="flex items-center px-8 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 mr-2 transition-transform"
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

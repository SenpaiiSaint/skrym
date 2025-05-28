import { Suspense } from "react";
import ContentRow from "@/components/content-row";
import HeroBanner from "@/components/hero-banner";
import Navigation from "@/components/navigation-menu";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <HeroBanner />
        </Suspense>
        <div className="space-y-8 px-4 md:px-8 py-8 pt-16">
          <Suspense fallback={<div>Loading...</div>}>
            <ContentRow 
              title="Continue Watching"
              category="continue-watching"
            />
          </Suspense>
          
          <Suspense fallback={<div>Loading....</div>}>
            <ContentRow 
              title="Trending Now"
              category="trending"
            />
          </Suspense>
          
          <Suspense fallback={<div>Loading...</div>}>
            <ContentRow 
              title="Popular Movies"
              category="movies"
            />
          </Suspense>
          
          <Suspense fallback={<div>Loading...</div>}>
            <ContentRow 
              title="Popular TV Shows"
              category="tv-shows"
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

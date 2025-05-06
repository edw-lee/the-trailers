import { cn } from "@/lib/utils";
import FeaturedTrailerSelector from "./FeaturedTrailersSelector";
import FeaturedTrailerVideoPlayer from "./FeaturedTrailerVideoPlayer";
import { getFeaturedTrailers } from "@/services/server/trailersService";

export default async function HeroBanner() {
  const featuredTrailers = await getFeaturedTrailers();

  return (
    <div
      className={cn(
        "bg-black",
        "w-full max-w-screen aspect-video max-h-[95vh]",
        "relative"
      )}
    >
      <FeaturedTrailerVideoPlayer featuredTrailers={featuredTrailers.results} />
      <div
        className={cn(
          "w-full",
          "absolute bottom-0 flex flex-col items-center",
          "bg-linear-to-t from-background from-10% to-background/0 to-60%"
        )}
      >
        <FeaturedTrailerSelector featuredTrailers={featuredTrailers.results} />
      </div>
    </div>
  );
}

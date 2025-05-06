import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import FeaturedTrailerSelector from "./FeaturedTrailersSelector";
import FeaturedTrailerVideoPlayer from "./FeaturedTrailerVideoPlayer";
import MuteButton from "./MuteButton";

export default function HeroBanner() {
  return (
    <div
      className={cn(
        "bg-black",
        "w-full max-w-screen aspect-video max-h-[95vh]",
        "relative"
      )}
    >
      <FeaturedTrailerVideoPlayer />
      <div
        className={cn(
          "w-full",
          "absolute bottom-0 flex flex-col items-center",
          "bg-linear-to-t from-background from-10% to-background/0 to-60%"
        )}
      >
        <FeaturedTrailerSelector />
      </div>
    </div>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleAlert } from "lucide-react";
import { Progress } from "../../../../components/ui/progress";
import { FeaturedTrailerDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";

type FeaturedTrailerThumbnailProps = {
  trailer?: FeaturedTrailerDto;
  isLoading?: boolean;
  hasError?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function FeaturedTrailerThumbnail({
  trailer,
  isLoading,
  hasError,
  isSelected,
  onClick,
}: FeaturedTrailerThumbnailProps) {
  const { isPlaying, playProgress } = useAppSelector(({ home }) => home);

  if (isLoading) {
    return <Skeleton className="aspect-video rounded-2xl" />;
  }

  if (hasError || !trailer) {
    return (
      <div
        className={cn(
          "aspect-video rounded-2xl",
          "flex justify-center items-center",
          "bg-gray-900"
        )}
      >
        <CircleAlert className="text-red-500" />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-video rounded-2xl overflow-hidden",
        "p-0 relative cursor-pointer",
        "border border-3 sm:border-4 border-transparent",
        "group hover:border-white",
        isSelected && "border-white"
      )}
    >
      <img className="object-cover" src={trailer.thumbnailUrl} />
      {/* Play/Pause indicator */}
      <span
        className={cn(
          "absolute w-[50px] sm:w-[70px] aspect-3/2 flex justify-center items-center",
          "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity",
          "group-hover:opacity-100 bg-lime-500 rounded-sm sm:rounded-lg",
          !isSelected ? "opacity-0" : "opacity-100"
        )}
      >
        {!isPlaying || !isSelected ? (
          <FontAwesomeIcon icon={faPlay} fontSize={20} />
        ) : (
          <FontAwesomeIcon icon={faPause} fontSize={20} />
        )}
      </span>
      <Progress
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[4px] sm:h-[8px]",
          !isSelected ? "opacity-0" : "opacity-100"
        )}
        value={isSelected ? playProgress * 100 : 0}
      />
    </button>
  );
}

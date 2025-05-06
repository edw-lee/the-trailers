"use client";

import { FeaturedTrailerDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";
import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedTrailerIndex,
  setShouldPlayVideo,
} from "@/store/slices/homeSlice";
import {
  SquareArrowOutUpRight
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
import FeaturedTrailerThumbnail from "./FeaturedTrailerThumbnail";
import MuteButton from "./MuteButton";

type FeaturedTrailerSelectorProps = {
  classNames?: string;
  featuredTrailers: FeaturedTrailerDto[];
};

export default function FeaturedTrailerSelector({
  classNames,
  featuredTrailers,
}: FeaturedTrailerSelectorProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { selectedTrailerIndex, isPlaying } = useAppSelector(
    ({ home }) => home
  );
  const dispatch = useAppDispatch();
  const selectedTrailer = featuredTrailers?.at(selectedTrailerIndex);

  const onThumbnailClick = (index: number) => {
    if (index != selectedTrailerIndex) {
      dispatch(setSelectedTrailerIndex(index));
      dispatch(setShouldPlayVideo(true));
    } else {
      dispatch(setShouldPlayVideo(!isPlaying));
    }
  };

  const onNextClick = () => {
    dispatch(
      setSelectedTrailerIndex(
        Math.min(selectedTrailerIndex + 1, featuredTrailers.length - 1)
      )
    );
  };

  const onPrevClick = () => {
    dispatch(setSelectedTrailerIndex(Math.max(0, selectedTrailerIndex - 1)));
  };

  useEffect(() => {
    carouselApi?.scrollTo(selectedTrailerIndex);
  }, [selectedTrailerIndex]);

  return (
    <div className={cn("w-full container px-2", classNames)}>
      <div className="flex gap-2 mb-2 drop-shadow">
        {selectedTrailer?.casts.slice(0, 3)?.map((cast, index) => (
          <p key={index} className="text-xs md:text-lg">
            {cast}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-between mb-3 gap-1">
        <p
          className={cn(
            fjalla.className,
            "text-2xl md:text-4xl uppercase text-ellipsis overflow-hidden whitespace-nowrap"
          )}
        >
          {selectedTrailer?.title}
        </p>

        <div className="flex gap-3 items-center">
          <a href={`/details/${selectedTrailer?.tmdbId}`}>
            <SquareArrowOutUpRight />
          </a>

          <MuteButton />
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Carousel
          className="flex-grow"
          opts={{
            align: "start",
          }}
          setApi={setCarouselApi}
        >
          <CarouselPrevious className="hidden sm:flex"
            disabled={selectedTrailerIndex == 0}
            onClick={() => onPrevClick()}
          />
          <CarouselContent>
            {featuredTrailers?.map((trailer, index) => {
              const isSelected = index == selectedTrailerIndex;
              return (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 xl:basis-1/4"
                >
                  <FeaturedTrailerThumbnail
                    trailer={trailer}
                    isSelected={isSelected}
                    onClick={() => onThumbnailClick(index)}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext className="hidden sm:flex"
            disabled={selectedTrailerIndex == featuredTrailers.length - 1}
            onClick={() => onNextClick()}
          />
        </Carousel>
      </div>
    </div>
  );
}

"use client";

import { FeaturedTrailerDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";
import { useGetFeaturedTrailers } from "@/hooks/data/trailers/useGetFeaturedTrailers";
import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedTrailerIndex,
  setShouldPlayVideo,
} from "@/store/slices/homeSlice";
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
};

export default function FeaturedTrailerSelector({
  classNames,
}: FeaturedTrailerSelectorProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { data, isLoading, error } = useGetFeaturedTrailers();
  const { selectedTrailerIndex, isPlaying } = useAppSelector(
    ({ home }) => home
  );
  const dispatch = useAppDispatch();
  const featuredTrailers: FeaturedTrailerDto[] = data?.length
    ? data
    : Array.from({ length: 4 });
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
    <div className="w-full container">
      <div className="flex gap-2 mb-2 drop-shadow">
        {selectedTrailer?.casts.slice(0, 3)?.map((cast, index) => (
          <p key={index}>{cast}</p>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className={cn(fjalla.className, "text-4xl uppercase mb-3")}>
          {selectedTrailer?.title}
        </p>

        <MuteButton />
      </div>
      <div className="flex flex-row items-center gap-5">
        <Carousel
          className="flex-grow"
          opts={{
            align: "start",
          }}
          setApi={setCarouselApi}
        >
          <CarouselPrevious
            disabled={selectedTrailerIndex == 0}
            onClick={() => onPrevClick()}
          />
          <CarouselContent>
            {featuredTrailers?.map((trailer, index) => {
              const isSelected = index == selectedTrailerIndex;
              return (
                <CarouselItem key={index} className="basis-1/3 xl:basis-1/4">
                  <FeaturedTrailerThumbnail
                    trailer={trailer as FeaturedTrailerDto}
                    isLoading={isLoading}
                    hasError={Boolean(error)}
                    isSelected={isSelected}
                    onClick={() => onThumbnailClick(index)}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselNext
            disabled={selectedTrailerIndex == featuredTrailers.length - 1}
            onClick={() => onNextClick()}
          />
        </Carousel>
      </div>
    </div>
  );
}

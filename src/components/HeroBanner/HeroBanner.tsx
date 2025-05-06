"use client";

import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setIsPlaying,
  setPlayProgress,
  setSelectedTrailerIndex,
} from "@/store/slices/homeSlice";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Thumbnail from "./Thumbnail";

type TrailerSelector = {
  classNames?: string;
};

function TrailerSelector({ classNames }: TrailerSelector) {
  const { selectedTrailerIndex, playProgress } = useAppSelector(
    ({ home }) => home
  );
  const dispatch = useAppDispatch();

  const onThumbnailClick = (index: number) => {
    dispatch(setSelectedTrailerIndex(index));
  };

  return (
    <Carousel
      className={classNames}
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => {
          const isSelected = index == selectedTrailerIndex;
          return (
            <CarouselItem key={index} className="basis-1/3 xl:basis-1/4">
              <Thumbnail
                isSelected={isSelected}
                onClick={() => onThumbnailClick(index)}
                progress={isSelected ? playProgress * 100 : 0}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

export default function HeroBanner() {
  const { isPlaying } = useAppSelector(({ home }) => home);
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if (!isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const onVideoPlay = () => {
    dispatch(setIsPlaying(true));
  };

  const onVideoPause = () => {
    dispatch(setIsPlaying(false));
  };

  const onVideoProgress = () => {
    const currentTime = videoRef.current?.currentTime ?? 0;
    const duration = videoRef.current?.duration ?? 0;
    const progress = currentTime / duration;    
    dispatch(setPlayProgress(progress));
  };

  return (
    <div
      className={cn(
        "bg-black",
        "w-full max-w-screen aspect-video max-h-[95vh]",
        "relative"
      )}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={
          "https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_h264.mov"
        }
        autoPlay
        muted
        onPlay={onVideoPlay}
        onPause={onVideoPause}
        onProgress={onVideoProgress}
        onClick={onVideoClick}
      />
      <div
        className={cn(
          "w-full",
          "absolute bottom-0 flex flex-col items-center",
          "bg-linear-to-t from-background from-10% to-background/0 to-60%"
        )}
      >
        <div className="w-full container">
          <div className="flex gap-2 mb-2 drop-shadow">
            {Array.from({ length: 3 }).map((_, index) => (
              <p key={index}>Actor</p>
            ))}
          </div>
          <p className={cn(fjalla.className, "text-4xl uppercase mb-3")}>
            Title
          </p>
          <TrailerSelector />
        </div>
      </div>
    </div>
  );
}

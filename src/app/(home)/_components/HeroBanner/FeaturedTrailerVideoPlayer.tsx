"use client";

import { Spinner } from "@/components/ui/spinner";
import { useGetFeaturedTrailers } from "@/hooks/data/trailers/useGetFeaturedTrailers";
import useIsTabActive from "@/hooks/useIsTabActive";
import useIsTabInteracted from "@/hooks/useIsTabInteracted";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setIsPlaying,
  setPlayProgress,
  setSelectedTrailerIndex,
  setShouldPlayVideo,
} from "@/store/slices/homeSlice";
import { createBunnyVideoUrl } from "@/utils/urlUtils";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export default function FeaturedTrailerVideoPlayer() {
  const { data: featuredTrailers, isLoading, error } = useGetFeaturedTrailers();
  const { selectedTrailerIndex, shouldPlayVideo, isMuted } = useAppSelector(
    ({ home }) => home
  );
  const isInteracted = useIsTabInteracted();
  const isTabActive = useIsTabActive();
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedTrailer = featuredTrailers?.at(selectedTrailerIndex);

  const onVideoPlay = () => {
    dispatch(setIsPlaying(true));
  };

  const onVideoPause = () => {
    dispatch(setIsPlaying(false));
  };

  const onVideoEnd = () => {
    dispatch(setIsPlaying(false));
    dispatch(setShouldPlayVideo(false));
    dispatch(
      setSelectedTrailerIndex(
        selectedTrailerIndex < featuredTrailers!.length - 1
          ? selectedTrailerIndex + 1
          : 0
      )
    );
  };

  const onVideoProgress = () => {
    const currentTime = videoRef.current?.currentTime ?? 0;
    const duration = videoRef.current?.duration ?? 0;
    const progress = currentTime / duration;
    dispatch(setPlayProgress(progress));
  };

  useEffect(() => {
    if (isTabActive) {
      dispatch(setShouldPlayVideo(true));
    } else {
      dispatch(setShouldPlayVideo(false));
    }
  }, [isTabActive]);

  useEffect(() => {
    if (shouldPlayVideo) {
      if (videoRef.current?.paused) {
        videoRef.current?.play();
      }
    } else {
      if (!videoRef.current?.paused) {
        videoRef.current?.pause();
      }
    }
  }, [shouldPlayVideo]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner fill="oklch(76.8% 0.233 130.85)" />
      </div>
    );
  }

  if (error || !selectedTrailer) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <AlertCircle color="red" />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      src={createBunnyVideoUrl(selectedTrailer.bunnyCDNVideoId)}
      autoPlay
      muted={!isInteracted || isMuted}
      onPlay={onVideoPlay}
      onPause={onVideoPause}
      onEnded={onVideoEnd}
      onTimeUpdate={onVideoProgress}
    />
  );
}

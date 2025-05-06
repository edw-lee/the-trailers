"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";
import { cn } from "@/lib/utils";
import { createBunnyVideoUrl } from "@/utils/urlUtils";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PlayButtonProps = {
  movieDetails: MovieDetailsDto;
};

export default function PlayButton({ movieDetails }: PlayButtonProps) {
  const onClick = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "relative flex justify-center items-center",
            "grow min-w-[150px] h-full aspect-[3/2] p-2",
            "bg-lime-500 hover:bg-lime-600 rounded-2xl cursor-pointer"
          )}
        >
          <FontAwesomeIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl xl:text-6xl"
            icon={faPlay}            
          />
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{movieDetails.title} Trailer</DialogTitle>
        </DialogHeader>
        <iframe className="aspect-video"
          width={"100%"}
          src={`https://www.youtube.com/embed/${movieDetails.youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </DialogContent>
    </Dialog>
  );
}

import { Badge } from "@/components/ui/badge";
import ProgressiveImage from "@/components/ui/progressive-image";
import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";
import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import PlayButton from "./PlayButton";

export type BannerMovieInfo = {
  label: string;
  value: string;
  className?: string;
};

export type BannerMovieInfoSectionProps = {
  movieDetails: MovieDetailsDto;
};

export type BannerProps = {
  movieDetails: MovieDetailsDto;
};

function BannerMovieInfo({ label, value, className }: BannerMovieInfo) {
  return (
    <div
      className={cn(
        "relative grow min-w-[150px] aspect-[3/2]",
        "bg-gray-300/30 backdrop-blur rounded-2xl",
        className
      )}
    >
      <p
        className={cn(
          "absolute top-0 left-2 h-full rotate-180",
          "uppercase text-xs md:text-md lg:text-lg opacity-50 text-center",
          fjalla.className
        )}
        style={{ writingMode: "vertical-lr" }}
      >
        {label}
      </p>
      <p
        className={cn(
          fjalla.className,
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "text-md md:text-lg lg:text-xl xl:text-4xl whitespace-nowrap"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function BannerMovieInfoSection({ movieDetails }: BannerMovieInfoSectionProps) {
  return (
    <div className="container px-2 sm:px-0">
      <div className="flex gap-2 sm:gap-5 mb-2 drop-shadow">
        {movieDetails?.casts.slice(0, 3)?.map((cast, index) => (
          <p key={index} className="text-xs md:text-lg">
            {cast.name}
          </p>
        ))}
      </div>
      <p
        className={cn(
          fjalla.className,
          "text-2xl md:text-4xl uppercase text-ellipsis overflow-hidden whitespace-nowrap mb-2"
        )}
      >
        {movieDetails?.title}
      </p>
      <div className="flex gap-2 mb-4 sm:mb-8 drop-shadow">
        {movieDetails?.genres.slice(0, 3)?.map((genre, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="px-4 py-1 bg-gray-400/30 backdrop-blur"
          >
            {genre}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 md:gap-3 lg:gap-5 overflow-x-auto no-scrollbar">
        <PlayButton movieDetails={movieDetails} />
        <BannerMovieInfo label="PG Rating" value={movieDetails.pg} />
        <BannerMovieInfo
          label="Release"
          value={dayjs(movieDetails.releaseDate).format("MMM DD, YY")}
        />
        <BannerMovieInfo
          label="Budget"
          value={`$${Intl.NumberFormat("en", { notation: "compact" }).format(
            movieDetails.budget
          )}`}
        />
        <BannerMovieInfo
          label="Duration"
          value={`${movieDetails.duration} min`}
        />
      </div>
    </div>
  );
}

export default function Banner({ movieDetails }: BannerProps) {
  return (
    <div
      className={cn(
        "bg-black",
        "w-full max-w-screen sm:aspect-video max-h-[95vh]",
        "relative"
      )}
    >
      <ProgressiveImage
        containerClassName="w-full h-full borders"
        className="w-full h-full object-cover"
        placeholder={movieDetails.backdropLowResUrl}
        srcSet={`${movieDetails.backdropLargeUrl} highRes, ${movieDetails.backdropSmallUrl} lowRes`}
        sizes="(max-width: 600px) lowRes, highRes"
        src={movieDetails.backdropLargeUrl}
        loading="lazy"
      />
      <div
        className={cn(
          "w-full",
          "sm:absolute bottom-0 flex flex-col items-center mt-3",
          "bg-linear-to-t from-background from-10% to-background/0 to-60%"
        )}
      >
        <BannerMovieInfoSection movieDetails={movieDetails} />
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionTrailerDto } from "@/dtos/trailers/SectionTrailerDto";
import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import { fjalla } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getSectionTrailers } from "@/services/server/trailersService";
import { stringToColour } from "@/utils/colorUtil";
import dayjs from "dayjs";
import Rating from "./Rating";

const sectionHeaderMapping = {
  [SectionTypeEnums.NOW_PLAYING]: "Now Playing",
  [SectionTypeEnums.POPULAR]: "Popular",
  [SectionTypeEnums.TOP_RATED]: "Top Rated",
  [SectionTypeEnums.UPCOMING]: "Upcoming",
};

const sectionHeaderIconMapping = {
  [SectionTypeEnums.NOW_PLAYING]: "/icons/clapperboard.png",
  [SectionTypeEnums.POPULAR]: "/icons/flame.png",
  [SectionTypeEnums.TOP_RATED]: "/icons/star.png",
  [SectionTypeEnums.UPCOMING]: "/icons/megaphone.png",
};

type TrailersListSectionProps = {
  hideHeader?: boolean;
  className?: string;
  sectionType: SectionTypeEnums;
};

type TrailerSectionThumbnailProps = {
  trailer: SectionTrailerDto;
  hasError?: boolean;
};

function TrailerSectionThumbnail({
  trailer,
  hasError,
}: TrailerSectionThumbnailProps) {
  if (hasError) {
    return (
      <div>
        <Skeleton className="rounded-xl mb-5 aspect-2/3" />
        <Skeleton className="h-[15px] mb-2" />
        <div className="flex gap-3">
          <Skeleton className="h-[15px] w-[150px]" />
          <Skeleton className="h-[30px] w-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <a href={`/details/${trailer.id}`} className="cursor-pointer">
      <img
        className="rounded-xl mb-5 transition-transform hover:scale-105 hover:drop-shadow-lg"
        src={trailer.posterUrl}
      />
      <p className={cn(fjalla.className, "mb-2")}>{trailer.title}</p>
      <div className="flex gap-3 items-center">
        <p>{dayjs(new Date(trailer.releaseDate)).format("MMM DD")}</p>
        {trailer.genre && (
          <Badge
            className="hidden lg:inline"
            variant={"outline"}
            style={{ borderColor: stringToColour(trailer.genre) }}
          >
            {trailer.genre}
          </Badge>
        )}
        <Rating rating={trailer.rating} />
      </div>
    </a>
  );
}

export default async function TrailersListSection({
  sectionType,
  hideHeader,
  className,
}: TrailersListSectionProps) {
  let hasError = false;
  let trailers: SectionTrailerDto[] = Array.from({ length: 5 });

  try {
    const results = await getSectionTrailers(sectionType);
    trailers = results;
  } catch {
    hasError = true;
  }

  return (
    <div className={cn("w-full max-w-screen flex justify-center px-2", className)}>
      <div className="container">
        {!hideHeader && (
          <span className="flex flex-row gap-3 items-center mb-5">
            <img
              src={sectionHeaderIconMapping[sectionType]}
              className="aspect-square object-contain"
              width={20}
            />
            <p className="text-lg font-bold">
              {sectionHeaderMapping[sectionType]}
            </p>
          </span>
        )}
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselContent>
            {trailers.map((trailer, index) => (
              <CarouselItem key={index} className="basis-1/3 md:basis-1/5 sm:m-3">
                <TrailerSectionThumbnail
                  trailer={trailer}
                  hasError={hasError}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </div>
    </div>
  );
}

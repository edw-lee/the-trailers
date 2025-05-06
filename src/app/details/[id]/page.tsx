import { getMovieDetails } from "@/services/server/movieDetailsService";
import Banner from "./_components/Banner";
import MovieDetailsSection from "./_components/MovieDetailsSection";
import { notFound } from "next/navigation";
import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";
import CastAvatar from "./_components/CastAvatar";
import TrailersListSection from "@/components/TrailersListSection";
import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import Rating from "@/components/Rating";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  let movieDetails: MovieDetailsDto;

  try {
    movieDetails = await getMovieDetails(id);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <Banner movieDetails={movieDetails} />
      <div className="container flex flex-col my-10 gap-10">
        <div className="flex flex-row justify-between gap-20">
          <MovieDetailsSection header="Description">
            <p>{movieDetails.description}</p>
          </MovieDetailsSection>
          <MovieDetailsSection header="Hype">
            <Rating rating={movieDetails.rating} className="w-[60px]" />
          </MovieDetailsSection>
        </div>
        <MovieDetailsSection header="Casts">
          <div className="flex flex-row gap-5">
            {movieDetails.casts.map((cast) => (
              <CastAvatar
                key={cast.id}
                imageUrl={cast.imageUrl}
                name={cast.name}
              />
            ))}
          </div>
        </MovieDetailsSection>
        <MovieDetailsSection header="Other Upcoming Films">
          <TrailersListSection
            sectionType={SectionTypeEnums.UPCOMING}
            hideHeader
          />
        </MovieDetailsSection>
      </div>
    </div>
  );
}

import { SectionTrailerDto } from "@/dtos/trailers/SectionTrailerDto";
import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import { createTMDBImageUrl } from "@/utils/urlUtils";
import { getGenres } from "./moviesService";
import { createServerClient } from "@/utils/supabase/server";
import { GetFeaturedTrailersResponseDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";

export async function getFeaturedTrailers(): Promise<GetFeaturedTrailersResponseDto> {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase
      .from("random_featured_trailers")
      .select()
      .limit(10);

    if (error) {
      throw error;
    }

    const response: GetFeaturedTrailersResponseDto = {
      results: data,
    };

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSectionTrailers(
  sectionType: SectionTypeEnums
): Promise<SectionTrailerDto[]> {
  try {
    const genres = (await getGenres(true)) as Record<string, string>;

    const { results: tmdbMovieResults } = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${sectionType}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    ).then((res) => res.json());

    const results: SectionTrailerDto[] = (
      tmdbMovieResults as Array<any>
    ).map<SectionTrailerDto>((movieData: any) => ({
      id: movieData.id,
      title: movieData.title,
      releaseDate: movieData.release_date,
      genre: movieData.genre_ids?.length
        ? genres[movieData.genre_ids[0]]
        : undefined,
      posterUrl: createTMDBImageUrl(movieData.poster_path, "w400"),
      rating: movieData.vote_average,
    }));

    return results;
  } catch (error) {
    throw error;
  }
}
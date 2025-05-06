import { SectionTrailerDto } from "@/dtos/trailers/SectionTrailerDto";
import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import { createTMDBImageUrl } from "@/utils/urlUtils";
import { getGenres } from "./moviesService";
import { createServerClient } from "@/utils/supabase/server";
import { GetFeaturedTrailersResponseDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";
import { FetchClient } from "@/lib/fetchClient";
import { TMDBMovieDto } from "@/dtos/trailers/TMDBMovieDto";

const fetchInstance = new FetchClient({
  baseURL: process.env.TMDB_BASE_URL,
  defaultInit: {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  },
});

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

    const { results: tmdbMovieResults } = await fetchInstance
      .fetch(`/movie/${sectionType}`)
      .then((res) => res.json());

    const results: SectionTrailerDto[] = (
      tmdbMovieResults as Array<TMDBMovieDto>
    ).map<SectionTrailerDto>((movieData) => ({
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

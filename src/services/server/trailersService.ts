import { SectionTrailerDto } from "@/dtos/trailers/SectionTrailerDto";
import { SectionTypeEnums } from "@/enums/services/sectionTypeEnums";
import { createTMDBImageUrl } from "@/utils/urlUtils";
import { getGenres } from "./movieDetailsService";

const route = "/api/trailers";

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

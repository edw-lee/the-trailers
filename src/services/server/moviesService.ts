import { GenreDto } from "@/dtos/movieDetails/GenreDto";
import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";
import { SearchMovieDto } from "@/dtos/trailers/SearchMovieDto";
import { TMDBMovieDto } from "@/dtos/trailers/TMDBMovieDto";
import { FetchClient } from "@/lib/fetchClient";
import { createTMDBImageUrl } from "@/utils/urlUtils";

const fetchInstance = new FetchClient({
  baseURL: process.env.TMDB_BASE_URL,
  defaultInit: {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  },
});

export async function getGenres(
  convertToMap: boolean = false
): Promise<GenreDto[] | Record<string, string>> {
  try {
    const { genres } = await fetchInstance
      .fetch("/genre/movie/list")
      .then((res) => res.json());

    if (!convertToMap) {
      return genres;
    } else {
      const map: Record<string, string> = {};

      genres.forEach((genre: GenreDto) => {
        map[genre.id] = genre.name;
      });

      return map;
    }
  } catch (error) {
    throw error;
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetailsDto> {
  try {
    const fetchMovieDetails = fetchInstance
      .fetch(`/movie/${id}`)
      .then((res) => res.json());

    const fetchCasts = fetchInstance
      .fetch(`/movie/${id}/credits`)
      .then((res) => res.json());

    const fetchVideos = fetchInstance
      .fetch(`/movie/${id}/videos`)
      .then((res) => res.json());

    const [tmdbMovieResults, tmdbCastsResults, tmdbVideosResults] =
      await Promise.all([fetchMovieDetails, fetchCasts, fetchVideos]);

    const casts = tmdbCastsResults.cast
      .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
      .slice(0, 5)
      .map((cast: { id: string; name: string; profile_path: string }) => ({
        id: cast.id,
        name: cast.name,
        imageUrl: createTMDBImageUrl(cast.profile_path, "w200"),
      }));

    const youtubeVideo = tmdbVideosResults.results.find(
      (video: { site: string; type: string }) =>
        video.site.toLowerCase() == "youtube" &&
        video.type.toLowerCase() == "trailer"
    );

    const result: MovieDetailsDto = {
      id: tmdbMovieResults.id,
      title: tmdbMovieResults.title,
      backdropLargeUrl: createTMDBImageUrl(
        tmdbMovieResults.backdrop_path,
        "original"
      ),
      backdropSmallUrl: createTMDBImageUrl(
        tmdbMovieResults.backdrop_path,
        "w500"
      ),
      backdropLowResUrl: createTMDBImageUrl(
        tmdbMovieResults.backdrop_path,
        "w200"
      ),
      description: tmdbMovieResults.overview,
      releaseDate: tmdbMovieResults.release_date,
      budget: tmdbMovieResults.budget,
      duration: tmdbMovieResults.runtime,
      pg: tmdbMovieResults.adult ? "18+" : "PG",
      genres: tmdbMovieResults.genres.map(
        (genre: { name: string }) => genre.name
      ),
      rating: tmdbMovieResults.vote_average,
      casts,
      youtubeId: youtubeVideo?.key,
    };

    return result;
  } catch (error) {
    throw error;
  }
}

export async function searchMovies(query: string): Promise<SearchMovieDto[]> {
  try {
    const searchParams = new URLSearchParams({
      query,
    });

    const { results: tmdbMovieResults } = await fetchInstance
      .fetch(`/search/movie?${searchParams.toString()}`)
      .then((res) => res.json());

    const results: SearchMovieDto[] = (
      tmdbMovieResults as Array<TMDBMovieDto>
    ).map<SearchMovieDto>((movieData) => ({
      id: movieData.id,
      title: movieData.title,
      thumbnailUrl: createTMDBImageUrl(movieData.poster_path, "w200"),
    }));

    return results;
  } catch (error) {
    throw error;
  }
}

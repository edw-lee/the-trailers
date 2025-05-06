import { SearchMovieDto } from "@/dtos/trailers/SearchMovieDto";
import { fetcher, emptyFetcher } from "@/utils/swr/fetcher";
import useSWR from "swr";

const route = "/api/movies";

export function useSearchMovies(query: string) {
  return useSWR<SearchMovieDto[]>(
    `${route}/search?query=${query}`,
    (url: string) =>
      query
        ? fetcher<SearchMovieDto[]>(url).then((res) => res)
        : emptyFetcher<SearchMovieDto[]>(),
    {
      revalidateOnFocus: false,
    }
  );
}

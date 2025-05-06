import useSWR from "swr";
import {
  FeaturedTrailerDto,
  GetFeaturedTrailersResponseDto,
} from "@/dtos/trailers/GetFeaturedTrailersResponseDto";
import { fetcher } from "@/utils/swr/fetcher";

const route = "/api/trailers";

export function useGetFeaturedTrailers() {
  return useSWR<FeaturedTrailerDto[]>(
    `${route}/featured`,
    (url: string) =>
      fetcher<GetFeaturedTrailersResponseDto>(url).then(
        (res: GetFeaturedTrailersResponseDto) => res.results
      ),
    {
      revalidateOnFocus: false,
    }
  );
}

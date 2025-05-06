import { GetFeaturedTrailersResponseDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";

const route = "/api/trailers";

export async function getFeaturedTrailers(): Promise<GetFeaturedTrailersResponseDto> {
  try {
    const data = await fetch(`${route}/featured`).then((res) => res.json());

    return data;
  } catch (error) {
    throw error;
  }
}

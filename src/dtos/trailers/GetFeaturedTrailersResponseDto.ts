export interface FeaturedTrailerDto {
  id: string;
  slug: string;
  tmdbId: string;
  bunnyCDNVideoId: string;
  title: string;
  casts: string[];
  description: string;
  backdropUrl: string;
  posterUrl: string;
  thumbnailUrl: string;
}

export interface GetFeaturedTrailersResponseDto {
  results: FeaturedTrailerDto[];
}

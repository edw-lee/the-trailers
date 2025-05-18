export interface CastDto {
  id: string;
  name: string;
  imageUrl: string;
}

export interface MovieDetailsDto {
  id: string;
  title: string;
  backdropLargeUrl: string;
  backdropSmallUrl: string;
  backdropLowResUrl: string;
  description: string;
  releaseDate: string;
  budget: number;
  duration: number;
  pg: string;
  genres: string[];
  rating: number;
  casts: CastDto[];
  youtubeId: string;
}

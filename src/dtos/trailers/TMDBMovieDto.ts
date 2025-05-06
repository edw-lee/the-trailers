export interface TMDBMovieDto {
  id: string;
  title: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
}

import { MovieDetailsDto } from "@/dtos/movieDetails/MovieDetailsDto";

export const mockMovieDetails: MovieDetailsDto = {
  id: "1",
  title: "Inception",
  backdropLargeUrl: "https://example.com/backdrop-large.jpg",
  backdropSmallUrl: "https://example.com/backdrop-small.jpg",
  backdropLowResUrl: "https://example.com/backdrop-low-res.jpg",
  casts: [
    {
      id: "1",
      name: "Leonardo DiCaprio",
      imageUrl: "https://example.com/leonardo.jpg",
    },
    {
      id: "2",
      name: "Joseph Gordon-Levitt",
      imageUrl: "https://example.com/joseph.jpg",
    },
    { id: "3", name: "Ellen Page", imageUrl: "https://example.com/ellen.jpg" },
  ],
  description:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  genres: ["Action", "Sci-Fi", "Thriller"],
  pg: "PG-13",
  rating: 8.8,
  releaseDate: "2010-07-16",
  budget: 160000000,
  duration: 148,
  youtubeId: "YoHD9XEInc0",
};

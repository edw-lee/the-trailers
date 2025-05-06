import featuredTrailerSeeds from "../datasets/feature-trailer-seeds.json";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

interface FeaturedTrailer {
  slug: string;
  tmdbId: string;
  bunnyCDNVideoId: string;
  title: string;
  description: string;
  casts: string;
  backdropUrl: string;
  posterUrl: string;
  thumbnailUrl: string;
}

const outputPath = "./datasets/feature-trailer-seeds.csv";

async function generateFeatureTrailersCSV() {
  console.log("Generating featured trailer seeds...");

  let csvContent = Object.keys({
    slug: "",
    tmdbId: "",
    bunnyCDNVideoId: "",
    title: "",
    description: "",
    casts: "",
    backdropUrl: "",
    posterUrl: "",
    thumbnailUrl: "",
  } as FeaturedTrailer).join(",");
  csvContent += "\r\n";

  for (let i = 0; i < featuredTrailerSeeds.length; i++) {
    const seed = featuredTrailerSeeds[i];

    try {
      const movieDetails = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/${featuredTrailerSeeds[i].tmdbId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      ).then((res) => res.json());

      const movieCasts = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/${seed.tmdbId}/credits`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      ).then((res) => res.json());

      const trailer: FeaturedTrailer = {
        slug: seed.slug,
        tmdbId: seed.tmdbId,
        bunnyCDNVideoId: seed.bunnyCDNVideoId,
        title: movieDetails?.title,
        description: movieDetails?.overview,
        casts: movieCasts?.cast.map((cast: any) => cast.name),
        backdropUrl: `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`,
        posterUrl: `https://image.tmdb.org/t/p/w400/${movieDetails?.poster_path}`,
        thumbnailUrl: `https://image.tmdb.org/t/p/w400/${movieDetails?.backdrop_path}`,
      };

      csvContent += Object.values(trailer)
        .map((value) => {
          if (Array.isArray(value)) {
            return `"[${value.map((value) => `""${value}""`).join(",")}]"`;
          } else {
            return JSON.stringify(value);
          }
        })
        .join(",");
      csvContent += "\r\n";

      console.log(
        `Added (${i + 1}/${featuredTrailerSeeds.length}):`,
        seed.slug
      );
    } catch (error) {
      console.log(
        "Failed to retrieve trailer details for",
        seed.slug,
        ", error:",
        error
      );
    }
  }

  fs.writeFileSync(outputPath, csvContent);

  console.log("Featured trailer seeds generated successfully.");
}

generateFeatureTrailersCSV();

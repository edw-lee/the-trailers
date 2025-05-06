export function createBunnyVideoUrl(videoId: string) {
  return `${process.env.NEXT_PUBLIC_BUNNY_CDN_URL}/${videoId}/play_720p.mp4`;
}

export function createTMDBImageUrl(
  imagePath: string,
  size: "original" | "w100" | "w200" | "w400" | "w500"
) {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/${size}${imagePath}`;
}

export function createBunnyVideoUrl(videoId: string) {
  return `${process.env.NEXT_PUBLIC_BUNNY_CDN_URL}/${videoId}/play_720p.mp4`;
}

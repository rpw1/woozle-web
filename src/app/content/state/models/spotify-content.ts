export interface SpotifyContent {
  id: string,
  type: ContentType
  name: string,
  description: string | undefined,
  image: SpotifyImage,
  tracks: Track[]
}

import { SpotifyContent } from './spotify-content';

export interface AvailableContent {
  albums: SpotifyContent[],
  artists: SpotifyContent[],
  playlists: SpotifyContent[]
}

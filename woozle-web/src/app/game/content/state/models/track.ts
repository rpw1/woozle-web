import { SpotifyImage } from '../../../../shared/models/spotify-image';

export interface Track {
  song: string,
  artist: string,
  album: string,
  songUri: string,
  image: SpotifyImage
}

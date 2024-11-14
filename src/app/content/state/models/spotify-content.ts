import { SpotifyImage } from '../../../shared/models/spotify-image'
import { ContentType } from './content-type'
import { Track } from './track'

export interface SpotifyContent {
  id: string,
  type: ContentType
  name: string,
  description: string | undefined,
  image: SpotifyImage | undefined,
  tracks: Track[]
}

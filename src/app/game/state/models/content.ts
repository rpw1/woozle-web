import { SpotifyImage } from '../../../shared/models/spotify-image'
import { ContentType } from './content-type'
import { Track } from './track'

export interface Content {
  id: string,
  type: ContentType
  name: string,
  description: string | undefined,
  image: SpotifyImage,
  tracks: Track[]
}

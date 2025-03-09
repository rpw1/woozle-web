import { AvailableContent } from './available-content'
import { AvailableContentFilters } from './available-content-filters'
import { SpotifyContent } from './spotify-content'

export interface Content {
  availableContent: AvailableContent,
  availableContentFilters: AvailableContentFilters,
  gameContent: SpotifyContent,
}

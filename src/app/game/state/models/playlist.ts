import { Track } from './track';

export interface Playlist {
  playlistId: string,
  name: string,
  tracks: Track[]
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyPlaylist } from '../../../shared/models/spotify-playlist';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [],
  templateUrl: './playlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {
  @Input({required: true}) playlist!: SpotifyPlaylist;
  @Output() selectedPlaylist = new EventEmitter<SpotifyPlaylist>();
}

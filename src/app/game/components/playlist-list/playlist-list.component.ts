import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { defer } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { PlaylistComponent } from '../playlist/playlist.component';
import { SpotifyPlaylist } from '../../../shared/models/spotify-playlist';
import { selectDevice } from '../../state/selectors/game.selector';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [
    CommonModule,
    PlaylistComponent,
    RouterLink
  ],
  templateUrl: './playlist-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistListComponent {
  private readonly gameStore = inject(Store<Game>);
  private readonly router = inject(Router);
  private readonly spotifyService = inject(SpotifyService);
  readonly playlists$ = defer(() => this.spotifyService.getCurrentUserPlaylists());
  readonly selectedDevice$ = this.gameStore.select(selectDevice);

  setPlaylist(playlist: SpotifyPlaylist) {
    this.gameStore.dispatch(GameActions.reset());
    this.gameStore.dispatch(GameActions.loadPlaylist({ playlist: playlist }));
    void this.router.navigate(['/game']);
  }
}

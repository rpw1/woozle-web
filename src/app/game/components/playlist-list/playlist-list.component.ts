import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { defer } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { PlaylistComponent } from '../playlist/playlist.component';
import { SpotifyPlaylist } from '../../../shared/models/spotify-playlist';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [
    CommonModule,
    PlaylistComponent
  ],
  templateUrl: './playlist-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistListComponent {
  private readonly game = inject(Store<Game>);
  private readonly router = inject(Router);
  private readonly spotifyService = inject(SpotifyService);
  playlist$ = defer(() => this.spotifyService.getCurrentUserPlaylists());

  setPlaylist(playlist: SpotifyPlaylist) {
    this.game.dispatch(GameActions.reset());
    this.game.dispatch(GameActions.loadPlaylist({ playlist: playlist }));
    void this.router.navigate(['/game']);
  }
}

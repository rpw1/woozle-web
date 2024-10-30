import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { defer } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { PlaylistComponent } from '../playlist/playlist.component';

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

  async selectPlaylist(playlistId: string) {
    this.game.dispatch(GameActions.setPlaylistId({ playlistId: playlistId }));
    void this.router.navigate(['/game']);
  }
}

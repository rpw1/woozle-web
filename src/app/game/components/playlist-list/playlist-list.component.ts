import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from '../playlist/playlist.component';
import { defer, firstValueFrom, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { GameActions } from '../../state/actions/game.actions';
import { Router } from '@angular/router';

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

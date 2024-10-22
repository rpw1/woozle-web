import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { Solution } from '../../state/models/solution.model';
import { selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { GuessListComponent } from '../guess-list/guess-list.component';
import { GuessComponent } from '../guess/guess.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    GuessListComponent,
    GuessComponent,
    ProgressBarComponent,
    CommonModule,
  ],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  private readonly gameStore = inject(Store<Game>);
  readonly isPlayingMusic$ = this.gameStore.select(selectIsPlayingMusic);
  private readonly authService = inject(AuthService);
  private readonly spotifyService = inject(SpotifyService);

  auth() {
    this.authService.authorize();
  }

  async getSpotifyUserInfo() {
    const devices = await firstValueFrom(this.spotifyService.getAvailableDevices());
    console.log(devices);
    const playlists = await firstValueFrom(this.spotifyService.getCurrentUserPlaylists());
    console.log(playlists);
  }

  async configureSolution() {
    const woozleTracks = await firstValueFrom(this.spotifyService.getPlaylistTracks('5WDtkOZjocf5Qs2WUxEdsg'));
    console.log(woozleTracks);
    const playlistLength = woozleTracks.total;
    const randomIndex = Math.floor(Math.random() * playlistLength) -1;
    const solutionTrack = woozleTracks.items[randomIndex].track
    const solutionTrackName = solutionTrack.name;
    const solutionAlbumnName = solutionTrack.album.name;
    const solutionArtistName = solutionTrack.artists[0].name;
    const solutionUri = solutionTrack.uri;
    const solution: Solution = {
      song: solutionTrackName,
      album: solutionAlbumnName,
      artist: solutionArtistName,
      songUri: solutionUri
    }
    this.gameStore.dispatch(GameActions.setGameSolution({solution: solution}));
  }

  togglePlayer() {
    this.gameStore.dispatch(GameActions.togglePlayer());
  }
}

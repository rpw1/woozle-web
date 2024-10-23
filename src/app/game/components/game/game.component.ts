import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
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
export class GameComponent implements OnInit {
  private readonly gameStore = inject(Store<Game>);
  readonly isPlayingMusic$ = this.gameStore.select(selectIsPlayingMusic);
  private readonly spotifyService = inject(SpotifyService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.createSolution()
  }

  createSolution(): void {
    const tracks = this.route.snapshot.data['tracks'];
    const randomIndex = Math.floor(Math.random() * tracks.length) -1;
    const solution = tracks[randomIndex];
    this.gameStore.dispatch(GameActions.setGameSolution({solution: solution}));
  }
 
  async getSpotifyUserInfo(): Promise<void> {
    const devices = await firstValueFrom(this.spotifyService.getAvailableDevices());
    console.log(devices);
    const playlists = await firstValueFrom(this.spotifyService.getCurrentUserPlaylists());
    console.log(playlists);
  }

  togglePlayer(): void {
    this.gameStore.dispatch(GameActions.togglePlayer());
  }
}

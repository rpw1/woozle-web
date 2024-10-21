import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { GuessListComponent } from '../guess-list/guess-list.component';
import { GuessComponent } from '../guess/guess.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { AuthService } from '../../../auth/services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { firstValueFrom } from 'rxjs';

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
  private deviceId: string = ''

  auth() {
    this.authService.authorize();
  }

  async devices() {
    const devices = await firstValueFrom(this.spotifyService.getAvailableDevices());
    console.log(devices);
    this.deviceId = devices.devices[0].id;
  }

  togglePlayer() {
    this.gameStore.dispatch(GameActions.togglePlayer());
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { selectIsPlayingMusic, selectPlaylist } from '../../state/selectors/game.selector';
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
    RouterLink
  ],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  private readonly gameStore = inject(Store<Game>);
  readonly isPlayingMusic$ = this.gameStore.select(selectIsPlayingMusic);
  readonly playlist$ = this.gameStore.select(selectPlaylist);

  togglePlayerOn(): void {
    this.gameStore.dispatch(GameActions.togglePlayerOn());
  }

  togglePlayerOff(): void {
    this.gameStore.dispatch(GameActions.togglePlayerOff());
  }
}

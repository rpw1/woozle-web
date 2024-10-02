import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GuessListComponent } from './game/components/guess-list/guess-list.component';
import { GuessComponent } from './game/components/guess/guess.component';
import { ProgressBarComponent } from './game/components/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Game } from './game/state/models/game.model';
import { selectIsPlayingMusic } from './game/state/selectors/game.selector';
import { GameActions } from './game/state/actions/game.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GuessListComponent,
    GuessComponent,
    ProgressBarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  private readonly gameStore = inject(Store<Game>);
  readonly isPlayingMusic$ = this.gameStore.select(selectIsPlayingMusic);

  togglePlayer() {
    this.gameStore.dispatch(GameActions.togglePlayer());
  }
}

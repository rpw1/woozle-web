import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuessListComponent } from './game/components/guess-list/guess-list.component';
import { GuessComponent } from './game/components/guess/guess.component';
import { ProgressBarComponent } from './game/components/progress-bar/progress-bar.component';
import { GameActions } from './game/state/actions/game.actions';
import { Game } from './game/state/models/game.model';
import { selectIsPlayingMusic } from './game/state/selectors/game.selector';

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

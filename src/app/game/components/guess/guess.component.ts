import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { v4 } from 'uuid';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './guess.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessComponent {
  readonly GuessType = GuessType;
  currentGuess: string = '';
  private readonly SKIP_GUESS_TEXT = 'SKIPPED';

  private readonly gameStore = inject(Store<Game>);

  submitGuess(guessType: GuessType): void {
    let guess: Guess;
    if (guessType === GuessType.SKIP) {
      guess = {
        id: v4(),
        type: GuessType.SKIP,
        song: this.SKIP_GUESS_TEXT
      };
    } else {
      guess = {
        id: v4(),
        type: GuessType.GUESS,
        song: this.currentGuess.trim()
      };
    }
    this.gameStore.dispatch(GameActions.addGuess({guess}))
    this.currentGuess = '';
  }
}

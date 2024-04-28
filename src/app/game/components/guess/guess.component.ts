import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GuessService } from '../../services/guess/guess.service';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { GameActions } from '../../state/actions/game.actions';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
  GuessType = GuessType;
  currentGuess: string = '';
  private SKIP_GUESS_TEXT = 'SKIPPED';

  private guessService = inject(GuessService);
  private gameStore = inject(Store<Game>);

  submitGuess(guessType: GuessType): void {
    let guess: Guess;
    if (guessType === GuessType.SKIP) {
      guess = {
        type: GuessType.SKIP,
        song: this.SKIP_GUESS_TEXT
      };
    } else {
      guess = {
        type: GuessType.GUESS,
        song: this.currentGuess.trim()
      };
    }
    this.gameStore.dispatch(GameActions.addGuess())
    this.guessService.makeGuess(guess);
    this.currentGuess = '';
  }
}

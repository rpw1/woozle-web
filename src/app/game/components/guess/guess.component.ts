import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GuessService } from '../../services/guess/guess.service';

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
    this.guessService.makeGuess(guess);
    this.currentGuess = '';
  }
}

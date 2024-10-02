import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { v4 } from 'uuid';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { defer, EMPTY, map, startWith, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './guess.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessComponent {
  private readonly gameStore = inject(Store<Game>);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly SKIP_GUESS_TEXT = 'SKIPPED';
  readonly GuessType = GuessType;

  guessForm = this.formBuilder.group({
    currentGuess: ['', [Validators.required, Validators.maxLength(100)]]
  });
  get currentGuess() { return this.guessForm.get('currentGuess'); }
  isCurrentGuessInvalid$ = defer(() => this.currentGuess?.statusChanges.pipe(
    startWith(this.currentGuess.status),
    map(x => (x === 'INVALID')
  )) ?? EMPTY);

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
        song: this.currentGuess?.value.trim()
      };
    }
    this.gameStore.dispatch(GameActions.addGuess({guess}))
    this.guessForm.reset();
  }
}

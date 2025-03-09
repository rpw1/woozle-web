import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  defer,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { v4 } from 'uuid';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { Content } from '../../content/state/models/content';
import { selectGameContent } from '../../content/state/selectors/content.selector';

@Component({
  selector: 'app-guess',
  imports: [ReactiveFormsModule, CommonModule, NgbTypeaheadModule],
  templateUrl: './guess.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessComponent {
  private readonly gameStore = inject(Store<Game>);
  private readonly contentStore = inject(Store<Content>);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly SKIP_GUESS_TEXT = 'SKIPPED';
  readonly GuessType = GuessType;

  search = (input: Observable<string>) =>
    input.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      concatLatestFrom(() => this.contentStore.select(selectGameContent)),
      map(([search, playlist]) => {
        return playlist.tracks
          .map(track => `${track.song} - ${track.artist}`)
          .filter((track) =>
            track.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          ).slice(0, 15);
      })
    );

  readonly guessForm = this.formBuilder.group({
    currentGuess: ['', [Validators.required, Validators.maxLength(500)]],
  });
  get currentGuess() {
    return this.guessForm.get('currentGuess');
  }
  isCurrentGuessInvalid$ = defer(
    () =>
      this.currentGuess?.statusChanges.pipe(
        startWith(this.currentGuess.status),
        map((x) => x === 'INVALID')
      ) ?? EMPTY
  );

  submitGuess(guessType: GuessType): void {
    let guess: Guess;
    if (guessType === GuessType.SKIP) {
      guess = {
        id: v4(),
        type: GuessType.SKIP,
        song: this.SKIP_GUESS_TEXT,
      };
    } else {
      guess = {
        id: v4(),
        type: GuessType.GUESS,
        song: this.currentGuess?.value.trim(),
      };
    }
    this.gameStore.dispatch(GameActions.addGuess({ guess }));
    this.guessForm.reset();
  }
}

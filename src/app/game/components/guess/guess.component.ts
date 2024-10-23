import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { debounceTime, defer, distinctUntilChanged, EMPTY, map, Observable, startWith, take } from 'rxjs';
import { v4 } from 'uuid';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { Track } from '../../state/models/track';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbTypeaheadModule
  ],
  templateUrl: './guess.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessComponent implements OnInit {
  private readonly gameStore = inject(Store<Game>);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly SKIP_GUESS_TEXT = 'SKIPPED';
  readonly GuessType = GuessType;

  private songs = [
    'Garden Song',
    'Cherry Wine',
    'Lemon',
    'Lucy',
    'Spite'
  ]

  ngOnInit(): void {
    const tracks = this.route.snapshot.data['tracks'] as Track[];
    this.songs = tracks.map(x => x.song);
  }

  search = (input: Observable<string>) => input.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    map(search => {
      return this.songs
        .filter(name => name.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()))
        .slice(0, 15);
    })
  );

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

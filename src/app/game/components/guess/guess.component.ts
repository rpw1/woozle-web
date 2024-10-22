import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { debounceTime, defer, distinctUntilChanged, EMPTY, firstValueFrom, map, Observable, startWith } from 'rxjs';
import { v4 } from 'uuid';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { Guess } from '../../models/guess';
import { GuessType } from '../../models/guess-type';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { selectSolution } from '../../state/selectors/game.selector';

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
  private readonly spotifyService = inject(SpotifyService);
  private readonly SKIP_GUESS_TEXT = 'SKIPPED';
  readonly GuessType = GuessType;
  private readonly solution$ = this.gameStore.select(selectSolution).pipe(
    map(async() => {
      const woozleTracks = await firstValueFrom(this.spotifyService.getPlaylistTracks('5WDtkOZjocf5Qs2WUxEdsg'));
      this.songs = woozleTracks.items.map((track: any) => {
        return track.track.name as string
      });
    }),
    takeUntilDestroyed()
  )

  private songs = [
    'Garden Song',
    'Cherry Wine',
    'Lemon',
    'Lucy',
    'Spite'
  ]

  ngOnInit(): void {
    this.solution$.subscribe();
  }

  search = (input: Observable<string>) => input.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    map(search => this.songs.filter(name => name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()))),
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

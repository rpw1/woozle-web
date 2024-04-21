import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Guess } from '../../../models/guess/guess';
import { GameConstants } from '../../../models/game-constants';
import { GuessType } from '../../../models/guess/guess-type';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  private currentGuessIndex = 0;
  public guesses: { [key: number]: Guess } = GameConstants.SECONDS_ARRAY.reduce((prev, _, index) => {
    return {...prev, [index]: {
      type: GuessType.UNKNOWN,
    }}
  }, {});


  private guessesSubject = new BehaviorSubject<Guess[]>(Object.values(this.guesses))
  public guesses$ = this.guessesSubject.asObservable();

  public makeGuess(guess: Guess): void {
    this.guesses = {... this.guesses, [this.currentGuessIndex]: guess}
    this.currentGuessIndex++;
    this.guessesSubject.next(Object.values(this.guesses));
  }
}

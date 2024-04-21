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
  private guesses: Guess[] = GameConstants.SECONDS_ARRAY.map(x => {
    return {
      type: GuessType.UNKNOWN
    }
  });

  private guessesSubject = new BehaviorSubject<Guess[]>(this.guesses);
  public guesses$ = this.guessesSubject.asObservable();

  public makeGuess(guess: Guess): void {
    this.guesses = [...this.guesses.slice(0, this.currentGuessIndex), guess, ...this.guesses.slice(this.currentGuessIndex + 1)];
    this.currentGuessIndex++;
    this.guessesSubject.next(Object.values(this.guesses));
  }
}

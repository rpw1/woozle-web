import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Guess } from '../../../models/guess';

@Injectable({
  providedIn: 'root'
})
export class GuessService {

  private guessSubject = new Subject<Guess>()
  public guess$ = this.guessSubject.asObservable();

  constructor() { }

  public makeGuess(guess: Guess): void {
    this.guessSubject.next(guess);
  }
}

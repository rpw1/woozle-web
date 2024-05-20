import { Injectable } from '@angular/core';
import { sum } from 'lodash';
import { GameConstants } from '../models/game-constants';

@Injectable({
  providedIn: 'root'
})
export class ValidateGameConstantsService {
  private validationResults: string[] = [];
  readonly entryCountMatchesTotalGuesses = `Entry count (${GameConstants.SECONDS_ARRAY.length}) is not equal to number of total guesses (${GameConstants.TOTAL_GUESSES})`
  readonly secondsArrayAddsUpToTotalTime = `Listen seconds (${GameConstants.LISTEN_SECONDS} seconds) is not equal to the sum of seconds array (${sum(GameConstants.SECONDS_ARRAY)})`

  constructor() { }

  validate(): string[] {
    this.validateTotalGuesses();
    this.validateSecondsArray();
    return this.validationResults;
  }

  private validateTotalGuesses() {
    if (GameConstants.SECONDS_ARRAY.length != GameConstants.TOTAL_GUESSES) {
      this.validationResults.push(this.entryCountMatchesTotalGuesses)
    }
  }

  private validateSecondsArray() {
    if (GameConstants.LISTEN_SECONDS != sum(GameConstants.SECONDS_ARRAY)) {
      this.validationResults.push(this.secondsArrayAddsUpToTotalTime)
    }
  }
}

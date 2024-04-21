import { Injectable } from '@angular/core';
import { ValidateGameConstantsService } from '../../validators/validate-game-constants.service';
import { sum } from 'lodash';
import { GameConstants } from '../../models/game-constants';
import { Constants } from '../../models/constants';

@Injectable({
  providedIn: 'root'
})
export class GameCalculationService {

  private guessPercentageArray: number[];

  constructor(private validateGameConstants: ValidateGameConstantsService) {
    const validationErrors = this.validateGameConstants.validate();
    if (validationErrors && validationErrors.length > 0) {
      throw validationErrors;
    }

    this.guessPercentageArray = GameConstants.SECONDS_ARRAY.map((val: number) => {
      return Constants.PERCENTAGE_CONVERSION * val / GameConstants.LISTEN_SECONDS;
    });

    this.guessPercentageArray[GameConstants.TOTAL_GUESSES - 1] -= sum(this.guessPercentageArray) - Constants.PERCENTAGE_CONVERSION
   }

  public getGamePercentageArray(): number[] {
    return this.guessPercentageArray;
  }
}

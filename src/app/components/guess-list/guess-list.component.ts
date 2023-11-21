import { Component } from '@angular/core';
import { GameConstants } from '../../models/constants';

@Component({
  selector: 'app-guess-list',
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.scss']
})
export class GuessListComponent {
  guessArray: number[] = GameConstants.SECONDS_ARRAY;
}

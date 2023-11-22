import { Component } from '@angular/core';
import { SongService } from '../../services/spotify/song/song.service';
import { GuessService } from '../../services/game/guess/guess.service';
import { Guess, GuessType } from '../../models/guess';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent {
  GuessType = GuessType;
  currentGuess: string = '';

  constructor(private songService: SongService
    ,private guessService: GuessService) {}

  searchSongs() {
    console.log(`searching for ${this.currentGuess}`);
  }

  submitGuess(guessType: GuessType): void {
    let guess: Guess;
    if (guessType == GuessType.SKIP) {
      guess = {
        type: GuessType.SKIP
      };
    } else {
      guess = {
        type: GuessType.GUESS,
        song: this.currentGuess.trim()
      };
    }
    this.guessService.makeGuess(guess);
    this.currentGuess = '';
  }
}

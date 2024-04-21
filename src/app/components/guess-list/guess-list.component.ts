import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GuessService } from '../../services/game/guess/guess.service';
import { GuessType } from '../../models/guess/guess-type';

@Component({
  selector: 'app-guess-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.scss']
})
export class GuessListComponent {

  guessType = GuessType;

  private guessService = inject(GuessService);
  guesses$ = this.guessService.guesses$;

}

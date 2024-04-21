import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GuessService } from '../../services/game/guess/guess.service';
import { GuessItemComponent } from '../guess-item/guess-item.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-guess-list',
  standalone: true,
  imports: [
    GuessItemComponent,
    CommonModule
  ],
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.scss']
})
export class GuessListComponent {

  private guessService = inject(GuessService);
  guesses$ = this.guessService.guesses$.pipe(
    map(x => Object.values(x))
  );

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuessType } from '../../models/guess-type';
import { Game } from '../../state/models/game.model';
import { selectGuesses } from '../../state/selectors/game.selector';

@Component({
  selector: 'app-guess-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessListComponent {

  guessType = GuessType;

  private gameStore = inject(Store<Game>);
  guesses$ = this.gameStore.select(selectGuesses);
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GuessListComponent } from '../guess-list/guess-list.component';
import { GuessComponent } from '../guess/guess.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { GameActions } from '../../state/actions/game.actions';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    GuessListComponent,
    GuessComponent,
    ProgressBarComponent,
    CommonModule
  ],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  private readonly gameStore = inject(Store<Game>);
  readonly isPlayingMusic$ = this.gameStore.select(selectIsPlayingMusic);

  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.authorize();
  }

  togglePlayer() {
    this.gameStore.dispatch(GameActions.togglePlayer());
  }
}

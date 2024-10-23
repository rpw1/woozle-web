import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { GameState } from '../../state/models/game-state.model';
import { Game } from '../../state/models/game.model';
import { selectCurrentGameState, selectSolution } from '../../state/selectors/game.selector';
import { GameActions } from '../../state/actions/game.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solution-modal',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule
  ],
  templateUrl: './solution-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionModalComponent {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly gameStore = inject(Store<Game>);
  private readonly route = inject(ActivatedRoute);
  readonly GameState = GameState;
  readonly endingGameState$ = this.gameStore.select(selectCurrentGameState).pipe(
    filter(x => x !== GameState.ACTIVE)
  );
  readonly solution$ = this.gameStore.select(selectSolution);

  closeModal() {
    // todo add a difference between close and dismiss. One to view the result and one to reset the game
    this.gameStore.dispatch(GameActions.reset());
    this.activeModal.close();
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { GameActions } from '../../state/actions/game.actions';
import { GameState } from '../../state/models/game-state.model';
import { Game } from '../../state/models/game.model';
import { selectCurrentGameState, selectSolution } from '../../state/selectors/game.selector';

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
  readonly GameState = GameState;
  readonly endingGameState$ = this.gameStore.select(selectCurrentGameState).pipe(
    filter(x => x !== GameState.ACTIVE)
  );
  readonly solution$ = this.gameStore.select(selectSolution);

  closeModal() {
    this.gameStore.dispatch(GameActions.reset());
    this.activeModal.close();
  }
}

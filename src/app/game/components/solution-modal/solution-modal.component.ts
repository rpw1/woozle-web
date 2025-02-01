import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { Track } from '../../../content/state/models/track';
import { GameState } from '../../state/models/game-state.model';
import { Game } from '../../state/models/game.model';
import {
  selectCurrentGameState,
  selectSolution,
} from '../../state/selectors/game.selector';

@Component({
    selector: 'app-solution-modal',
    imports: [CommonModule, NgbModule],
    templateUrl: './solution-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionModalComponent implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly gameStore = inject(Store<Game>);
  readonly GameState = GameState;
  readonly endingGameState$ = this.gameStore
    .select(selectCurrentGameState)
    .pipe(filter((x) => x !== GameState.ACTIVE));
  solution$: Observable<Track> | undefined;

  ngOnInit(): void {
    this.solution$ = this.gameStore.select(selectSolution).pipe(take(1));
  }

  closeModal() {
    this.activeModal.close(true);
  }
}

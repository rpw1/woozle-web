import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Track } from '../../content/state/models/track';
import { GameStore } from '../../state/game.state';
import { GameState } from '../../state/models/game-state.model';

@Component({
  selector: 'app-solution-modal',
  imports: [CommonModule, NgbModule],
  templateUrl: './solution-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionModalComponent implements OnInit {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly gameStore = inject(GameStore);
  readonly GameState = GameState;
  readonly currentGameState = this.gameStore.currentGameState;
    
  solution: Track | undefined;

  ngOnInit(): void {
    this.solution = this.gameStore.solution();
  }

  closeModal() {
    this.activeModal.close(true);
  }
}

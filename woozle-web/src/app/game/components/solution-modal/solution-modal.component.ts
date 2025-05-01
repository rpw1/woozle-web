import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal
} from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Track } from '../../content/state/models/track';
import { GameState } from '../../state/models/game-state.model';
import { SolutionStateService } from '../../state/solution-state.service';

@Component({
  selector: 'app-solution-modal',
  imports: [CommonModule, NgbModule],
  templateUrl: './solution-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolutionModalComponent {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly solutionStateService = inject(SolutionStateService);
  readonly GameState = GameState;
    
  solution: Signal<Track> = this.solutionStateService.solution;

  closeModal() {
    this.activeModal.close(true);
  }
}

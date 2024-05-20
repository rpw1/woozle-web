import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { ProgressBarTimerService } from '../../services/progress-bar-timer/progress-bar-timer.service';
import { Game } from '../../state/models/game.model';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { TaskStateType } from '../../state/models/queue-state-type.model';
import { selectNumberOfGuesses } from '../../state/selectors/game.selector';
import { selectQueueState } from '../../state/selectors/progress-bar-queue.selector';

@Component({
  selector: 'app-progress-segment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-segment.component.html',
  styleUrl: './progress-segment.component.scss'
})
export class ProgressSegmentComponent {
  @Input({required: true}) segmentIndex!: number;

  private gameStore = inject(Store<Game>);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private progressBarTimerService = inject(ProgressBarTimerService);
  numberOfGuesses$ = this.gameStore.select(selectNumberOfGuesses);
  private readonly progressBarQueueState$ = this.progressBarQueueStore.select(selectQueueState);
  private readonly progressBarSegmentPercentage$ = this.progressBarTimerService.progressBarSegmentPercentage$

  progressWidth$ = combineLatest([
    this.progressBarQueueState$,
    this.progressBarSegmentPercentage$
    ]).pipe(
      map(([state, percent]) => {
        if (state.activeItemState === TaskStateType.RESET) {
          return 0;
        }

        if (this.segmentIndex === state.successiveTasksRan) {
          return percent;
        } else if (this.segmentIndex < state.successiveTasksRan) {
          return 100;
        } else {
          return 0;
        }
      })
    )
}

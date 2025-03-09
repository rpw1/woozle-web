import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';
import { ProgressBarTimerService } from '../../services/progress-bar-timer.service';
import { Game } from '../../state/models/game.model';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { TaskStateType } from '../../state/models/queue-state-type.model';
import { selectNumberOfGuesses } from '../../state/selectors/game.selector';
import { selectQueueState } from '../../state/selectors/progress-bar-queue.selector';

@Component({
  selector: 'app-progress-segment',
  imports: [CommonModule],
  providers: [ProgressBarTimerService],
  templateUrl: './progress-segment.component.html',
  styleUrl: './progress-segment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressSegmentComponent {
  @Input({required: true}) segmentIndex!: number;

  private readonly gameStore = inject(Store<Game>);
  private readonly progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private readonly progressBarTimerService = inject(ProgressBarTimerService);
  readonly numberOfGuesses$ = this.gameStore.select(selectNumberOfGuesses);

  readonly progressWidth$ = this.progressBarTimerService.progressBarSegmentPercentage$.pipe(
    withLatestFrom(this.progressBarQueueStore.select(selectQueueState)),
    map(([percent, state]) => {
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
  );
}

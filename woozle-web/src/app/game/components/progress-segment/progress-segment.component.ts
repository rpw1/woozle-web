import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { map } from 'rxjs';
import { ProgressBarTimerService } from '../../services/progress-bar-timer.service';
import { GameStore } from '../../state/game.state';
import { TaskStateType } from '../../state/models/queue-state-type.model';
import { ProgressBarQueueStore } from '../../state/progress-bar-queue.state';

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

  private readonly gameStore = inject(GameStore);
  private readonly progressBarQueueStore = inject(ProgressBarQueueStore);
  private readonly progressBarTimerService = inject(ProgressBarTimerService);
  readonly numberOfGuesses = this.gameStore.numberOfGuesses;

  readonly progressWidth$ = this.progressBarTimerService.progressBarSegmentPercentage$.pipe(
    map(percent => {
      if (this.progressBarQueueStore.activeItemState() === TaskStateType.RESET) {
        return 0;
      }

      if (this.segmentIndex === this.progressBarQueueStore.successiveTasksRan()) {
        return percent;
      } else if (this.segmentIndex < this.progressBarQueueStore.successiveTasksRan()) {
        return 100;
      } else {
        return 0;
      }
    })
  );
}

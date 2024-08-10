import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ProgressBarTimerService } from '../../services/progress-bar-timer/progress-bar-timer.service';
import { Game } from '../../state/models/game.model';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { selectGuessIndex } from '../../state/selectors/game.selector';
import { selectActiveIndex } from '../../state/selectors/progress-bar-queue.selector';

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
  guesses$ = this.gameStore.select(selectGuessIndex);

  progressWidth$ = this.progressBarTimerService.progressBarPercentage$.pipe(
    concatLatestFrom(() => this.progressBarQueueStore.select(selectActiveIndex)),
    map(async ([percent, activeIndex]) => {;
      if (this.segmentIndex === activeIndex) {
        return await percent
      } else if (this.segmentIndex < (activeIndex ?? 0)) {
        return 100;
      } else {
        return 0;
      }
    }
  ));
}

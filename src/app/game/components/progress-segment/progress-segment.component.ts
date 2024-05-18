import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, take } from 'rxjs';
import { ProgressBarTimerService } from '../../services/progress-bar-timer/progress-bar-timer.service';
import { Game } from '../../state/models/game.model';
import { selectGuesses } from '../../state/selectors/game.selector';

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
  private progressBarTimerService = inject(ProgressBarTimerService);
  $guesses = this.gameStore.select(selectGuesses);

  progressWidth$ = this.progressBarTimerService.progressBarPercentage$.pipe(
    map(async (percent) => {;
      const guesses = await lastValueFrom(this.$guesses.pipe(take(1)));
      if (this.segmentIndex === guesses) {
        return percent
      } else if (this.segmentIndex < guesses) {
        return 100;
      } else {
        return 0;
      }
    }
  ));
}

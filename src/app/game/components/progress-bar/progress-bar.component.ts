import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarQueueEffects } from '../../state/effects/progress-bar-queue.effects';
import { GameCalculationService } from '../../services/game-calculation/game-calculation.service';
import { ProgressBarTimerService } from '../../services/progress-bar-timer/progress-bar-timer.service';
import { ProgressBarService } from '../../services/progress-bar/progress-bar.service';
import { ProgressSegmentComponent } from '../progress-segment/progress-segment.component';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSegmentComponent
  ],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  
  @ViewChildren('playerProgressBar') progressBarSegments!: QueryList<ElementRef<HTMLDivElement>>;

  private gameCalculationService = inject(GameCalculationService);
  guessPercentArray: number[] = this.gameCalculationService.getGamePercentageArray();

  private progressBarTimerService = inject(ProgressBarTimerService);
  progressBarPercentage$ = this.progressBarTimerService.progressBarPercentage$;

  private progressBarQueueEffects = inject(ProgressBarQueueEffects);

  private progressBarService = inject(ProgressBarService);

  private subscriptions : Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.progressBarQueueEffects.resetTasks$.subscribe(() => {
      this.progressBarSegments?.forEach((element: ElementRef<HTMLDivElement>) => {
        (element.nativeElement.firstElementChild as HTMLDivElement).style.width = 0 + '%';
      });
    }));
  }

  ngOnDestroy(): void {
    for(const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
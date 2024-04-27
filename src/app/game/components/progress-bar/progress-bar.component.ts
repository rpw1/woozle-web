import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarQueueEffects } from '../../../queue/state/progress-bar-queue.effects';
import { GameCalculationService } from '../../services/game-calculation/game-calculation.service';
import { ProgressBarTimerService } from '../../services/progress-bar-timer.service.ts/progress-bar-timer.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
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
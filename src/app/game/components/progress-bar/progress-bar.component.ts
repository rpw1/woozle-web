import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription, filter, timer } from 'rxjs';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';
import { WoozleTask } from '../../../queue/models/progress-bar-task';
import { WoozleTaskType } from '../../../queue/models/woozle-task-type';
import { GameCalculationService } from '../../services/game-calculation/game-calculation.service';
import { GuessService } from '../../services/guess/guess.service';
import { PlayerService } from '../../services/player/player.service';
import { CommonModule } from '@angular/common';
import { GuessType } from '../../models/guess-type';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  readonly TIMER_INTERVAL = 10;
  activeIndex: number = 0;
  private intervalPlayer!: Subscription;
  private subscriptions: Subscription[] = []; 
  guessPercentArray: number[] = [];
  @ViewChildren('playerProgressBar') progressBarSegments!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private gameCalculationService: GameCalculationService
    ,private playerService: PlayerService
    ,private queueService: QueueService
    ,private guessService: GuessService) {
      this.guessPercentArray = this.gameCalculationService.getGamePercentageArray();
    }

  ngOnInit(): void {
    this.subscriptions.push(this.playerService.player$.subscribe(() => {
      if (!this.queueService.hasRunningTask()) {
        this.queueService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, this.activeIndex);
      } else {
        this.intervalPlayer?.unsubscribe();
        this.queueService.clearAllTasks(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE);
        this.resetAllSegments();
      }
    }));

    this.subscriptions.push(this.guessService.guesses$
      .pipe(
        filter(x => x.some(y => y.type !== GuessType.UNKNOWN))
      ).subscribe(() => {
      this.activeIndex = this.activeIndex >= GameConstants.TOTAL_GUESSES ? 0 : this.activeIndex + 1;
      this.queueService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, this.activeIndex);
    }));
  }

  private runSegmentQueue(currentTask: WoozleTask): void {
    const index = currentTask.index ?? 0;
    let currentSegment = this.progressBarSegments?.get(index)?.nativeElement.firstElementChild as HTMLDivElement;
    if (currentSegment) {
      let currentWidth = 0
      this.intervalPlayer = timer(0, this.TIMER_INTERVAL).subscribe((interval: number) => {
        currentWidth += this.TIMER_INTERVAL / (GameConstants.SECONDS_ARRAY[index] * 10);
        currentSegment.style.width = currentWidth + '%';
        if (currentWidth >= Constants.PERCENTAGE_CONVERSION) {
          this.intervalPlayer.unsubscribe();
          this.queueService.endTask(currentTask);
        }
      });
    }
  }

  private resetAllSegments(): void {
    this.progressBarSegments?.forEach((element: ElementRef<HTMLDivElement>) => {
      (element.nativeElement.firstElementChild as HTMLDivElement).style.width = 0 + '%';
    });
  }

}
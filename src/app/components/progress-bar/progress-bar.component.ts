import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription, filter, timer } from 'rxjs';
import { Constants } from '../../models/constants';
import { GameConstants } from '../../models/game-constants';
import { WoozleTask } from '../../models/woozle-task/woozle-task';
import { WoozleTaskState } from '../../models/woozle-task/woozle-task-state';
import { WoozleTaskType } from '../../models/woozle-task/woozle-task-type';
import { GameCalculationService } from '../../services/game/game-calculation/game-calculation.service';
import { GuessService } from '../../services/game/guess/guess.service';
import { PlayerService } from '../../services/spotify/player/player.service';
import { TaskSchedulerService } from '../../services/utils/task-scheduler/task-scheduler.service';
import { CommonModule } from '@angular/common';
import { GuessType } from '../../models/guess/guess-type';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  readonly TIMER_INTERVAL = 10;
  activeIndex: number = 0;
  private intervalPlayer!: Subscription;
  private subscriptions: Subscription[] = []; 
  guessPercentArray: number[] = [];
  @ViewChildren('playerProgressBar') progressBarSegments!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private gameCalculationService: GameCalculationService
    ,private playerService: PlayerService
    ,private taskSchedulerService: TaskSchedulerService
    ,private guessService: GuessService) {
      this.guessPercentArray = this.gameCalculationService.getGamePercentageArray();
    }

  ngOnInit(): void {
    this.subscriptions.push(this.playerService.player$.subscribe(() => {
      if (!this.taskSchedulerService.hasRunningTask()) {
        this.taskSchedulerService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, this.activeIndex);
      } else {
        this.intervalPlayer?.unsubscribe();
        this.taskSchedulerService.clearAllTasks(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE);
        this.resetAllSegments();
      }
    }));

    this.subscriptions.push(this.taskSchedulerService.taskScheduler$.subscribe((task: WoozleTask) => {
      if (task.taskType === WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE) {
        this.handleQueuedTask(task);
      }
    }));

    this.subscriptions.push(this.guessService.guesses$
      .pipe(
        filter(x => Object.values(x)
          .some(y => y.type !== GuessType.UNKNOWN))
      ).subscribe(() => {
      this.activeIndex = this.activeIndex >= GameConstants.TOTAL_GUESSES ? 0 : this.activeIndex + 1;
      this.taskSchedulerService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, this.activeIndex);
    }));
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
          this.taskSchedulerService.endTask(currentTask);
        }
      });
    }
  }

  private resetAllSegments(): void {
    this.progressBarSegments?.forEach((element: ElementRef<HTMLDivElement>) => {
      (element.nativeElement.firstElementChild as HTMLDivElement).style.width = 0 + '%';
    });
  }

  private handleQueuedTask(task: WoozleTask) {
    if (task.taskState === WoozleTaskState.QUEUED && !this.taskSchedulerService.hasRunningTask()) {
      if (task.index != 0) {
        this.taskSchedulerService.clearAllTasks(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE);
        this.resetAllSegments();
        for (let i = 0; i <= this.activeIndex; i++) {
          this.taskSchedulerService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, i);
        }
      }
    } else if (task.taskState === WoozleTaskState.STARTED) {
      this.runSegmentQueue(task);
    } else if (task.taskState === WoozleTaskState.ENDED && !this.taskSchedulerService.hasRunningTask()) {
      this.resetAllSegments();
    }
  }
}
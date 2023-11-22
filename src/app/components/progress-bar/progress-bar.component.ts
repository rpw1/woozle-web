import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { GameCalculationService } from '../../services/game-calculation.service';
import { PlayerService } from '../../services/player.service';
import { Constants, GameConstants } from '../../models/constants';
import { TaskSchedulerService } from '../../services/task-scheduler.service';
import { WoozleTask, WoozleTaskState, WoozleTaskType } from '../../models/woozle-task';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  readonly TIMER_INTERVAL = 10;
  activeIndex: number = 0;
  private intervalPlayer!: Subscription;
  private subscriptions: Subscription[] = []; 
  guessPercentArray = this.gameCalculationService.getGamePercentageArray();
  @ViewChildren('playerProgressBar') progressBarSegments!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private gameCalculationService: GameCalculationService
    ,private playerService: PlayerService, private taskSchedulerService: TaskSchedulerService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.playerService.player$.subscribe((isOn: boolean) => {
      if (isOn) {
        this.taskSchedulerService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, this.activeIndex);
        if (this.activeIndex >= GameConstants.TOTAL_GUESSES) {
          this.intervalPlayer?.unsubscribe();
          this.taskSchedulerService.clearAllTasks();
          this.resetAllSegments();
        }
        this.activeIndex = this.activeIndex >= GameConstants.TOTAL_GUESSES ? 0 : this.activeIndex + 1;
      }
    }));

    this.subscriptions.push(this.taskSchedulerService.taskScheduler$.subscribe((task: WoozleTask) => {
      if (task.taskType === WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE) {
        this.handleQueuedTask(task);
      }
    }));
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private runSegmentQueue(currentTask: WoozleTask): void {
    const index = currentTask.index ?? 0;
    let currentSegment = this.progressBarSegments.get(index)?.nativeElement.firstElementChild as HTMLDivElement;
    if (currentSegment) {
      let currentWidth = 0;
      this.intervalPlayer = timer(0, this.TIMER_INTERVAL).subscribe((interval: number) => {
        currentWidth += this.TIMER_INTERVAL / (GameConstants.SECONDS_ARRAY[index] * 10);
        console.log(currentWidth)
        currentSegment.style.width = currentWidth + '%';
        if (currentWidth >= Constants.PERCENTAGE_CONVERSION) {
          this.intervalPlayer.unsubscribe();
          this.taskSchedulerService.endTask(currentTask);
        }
      });
    }
  }

  private resetAllSegments(): void {
    this.progressBarSegments.forEach((element: ElementRef<HTMLDivElement>) => {
      (element.nativeElement.firstElementChild as HTMLDivElement).style.width = 0 + '%';
    });
  }

  private handleQueuedTask(task: WoozleTask) {
    const queuedTaskCount = this.taskSchedulerService.getQueuedTaskCount();
    if (task.taskState === WoozleTaskState.QUEUED && !this.taskSchedulerService.hasRunningTask()) {
      if (task.index === 0) {
        this.taskSchedulerService.startTask();
      } else {
        this.taskSchedulerService.clearAllTasks();
        this.resetAllSegments();
        for (let i = 0; i <= this.activeIndex; i++) {
          this.taskSchedulerService.queueTask(WoozleTaskType.RUN_PROGRESS_SEGMENT_QUEUE, i);
        }
      }
    } else if (task.taskState === WoozleTaskState.STARTED) {
      this.runSegmentQueue(task);
    } else if (task.taskState === WoozleTaskState.ENDED) {
      if (queuedTaskCount > 0) {
        this.taskSchedulerService.startTask();
      }
    }
  }
}
import { Component, OnDestroy } from '@angular/core';
import { PlayerService } from './services/spotify/player/player.service';
import { TaskSchedulerService } from './services/utils/task-scheduler/task-scheduler.service';
import { Subscription } from 'rxjs';
import { WoozleTask, WoozleTaskState } from './models/woozle-task';
import { GuessService } from './services/game/guess/guess.service';
import { Guess } from './models/guess';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isPlaying = false;
  private subscriptions: Subscription[] = [];

  constructor(private playerService: PlayerService
    ,private taskSchedulerService: TaskSchedulerService
    ,private guessService: GuessService) {

    this.subscriptions.push(this.taskSchedulerService.taskScheduler$.subscribe((task: WoozleTask) => {
      if (task.taskState === WoozleTaskState.ENDED && !this.taskSchedulerService.hasRunningTask()) {
        this.isPlaying = false
      }
    }));

    this.subscriptions.push(this.guessService.guess$.subscribe((guess: Guess) => {
      this.isPlaying = true;
    }));
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  togglePlayer(): void {
    this.isPlaying = !this.isPlaying;
    this.playerService.togglePlayer();
  }
}

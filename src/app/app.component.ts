import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuessListComponent } from './game/components/guess-list/guess-list.component';
import { GuessComponent } from './game/components/guess/guess.component';
import { ProgressBarComponent } from './game/components/progress-bar/progress-bar.component';
import { WoozleTask } from './task-scheduler/models/woozle-task';
import { WoozleTaskState } from './task-scheduler/models/woozle-task-state';
import { GuessService } from './game/services/guess/guess.service';
import { PlayerService } from './game/services/player/player.service';
import { TaskSchedulerService } from './task-scheduler/services/task-scheduler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GuessListComponent, 
    GuessComponent,
    ProgressBarComponent
  ],
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

    this.subscriptions.push(this.guessService.guesses$.subscribe(() => {
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

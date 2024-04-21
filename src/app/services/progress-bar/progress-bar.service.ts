import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../spotify/player/player.service';
import { TaskSchedulerService } from '../utils/task-scheduler/task-scheduler.service';
import { GuessService } from '../game/guess/guess.service';
import { WoozleTaskType } from '../../models/woozle-task/woozle-task-type';
import { WoozleTask } from '../../models/woozle-task/woozle-task';
import { GuessType } from '../../models/guess/guess-type';
import { filter } from 'rxjs';
import { GameConstants } from '../../models/game-constants';
import { WoozleTaskState } from '../../models/woozle-task/woozle-task-state';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private playerService = inject(PlayerService);
  private taskSchedulerService = inject(TaskSchedulerService);

}

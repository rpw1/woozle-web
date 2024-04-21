import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { TaskSchedulerService } from '../../../task-scheduler/services/task-scheduler.service';
import { GuessService } from '../guess/guess.service';
import { WoozleTaskType } from '../../../task-scheduler/models/woozle-task-type';
import { WoozleTask } from '../../../task-scheduler/models/woozle-task';
import { GuessType } from '../../models/guess-type';
import { filter } from 'rxjs';
import { GameConstants } from '../../models/game-constants';
import { WoozleTaskState } from '../../../task-scheduler/models/woozle-task-state';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private playerService = inject(PlayerService);
  private taskSchedulerService = inject(TaskSchedulerService);

}

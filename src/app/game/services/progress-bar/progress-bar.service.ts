import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { QueueService } from '../../../queue/services/queue.service';
import { GuessService } from '../guess/guess.service';
import { WoozleTaskType } from '../../../queue/models/woozle-task-type';
import { WoozleTask } from '../../../queue/models/woozle-task';
import { GuessType } from '../../models/guess-type';
import { filter } from 'rxjs';
import { GameConstants } from '../../models/game-constants';
import { WoozleTaskState } from '../../../queue/models/woozle-task-state';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private playerService = inject(PlayerService);
  private queueService = inject(QueueService);

}

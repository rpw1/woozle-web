import { Injectable, inject } from '@angular/core';
import { GuessService } from '../guess/guess.service';
import { PlayerService } from '../player/player.service';
import { QueueState } from '../../../queue/state/queue-state.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  
  constructor(private store: Store<QueueState>,
    private guessService: GuessService,
    private playerService: PlayerService
  ) {
    
  }

}

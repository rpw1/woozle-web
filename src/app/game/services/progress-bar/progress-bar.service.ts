import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { ProgressBarQueue } from '../../../queue/state/progress-bar-queue.model';
import { Store } from '@ngrx/store';
import { ProgressBarQueueActions } from '../../../queue/state/progress-bar-queue.actions';
import { GuessService } from '../guess/guess.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private playerService = inject(PlayerService);
  private store = inject(Store<ProgressBarQueue>);

  constructor() {
    this.playerService.player$.subscribe((isActive: boolean) => {
      if (isActive) {
        this.store.dispatch(ProgressBarQueueActions.queueTask({
          tasks: 1 // todo: find something to manage this
        }));
      } else {
        this.store.dispatch(ProgressBarQueueActions.resetTasks());
      }
    });

    this.guessService.guesses$.subscribe(() => {
      this.store.dispatch(ProgressBarQueueActions.queueTask({
        tasks: 1
      }));
    });
  }
}

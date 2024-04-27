import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { ProgressBarQueue } from '../../../queue/state/progress-bar-queue.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ProgressBarQueueActions } from '../../../queue/state/progress-bar-queue.actions';
import { selectActiveTask } from '../../../queue/state/progress-bar-queue.selector';
import { GuessService } from '../guess/guess.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private store = inject(Store<ProgressBarQueue>);
  private playerService = inject(PlayerService);
  private guessService = inject(GuessService);

  constructor() {
    this.playerService.player$.pipe(
      map((isActive: boolean) => {
        if (isActive) {
          this.store.dispatch(ProgressBarQueueActions.queue({
            tasks: 1 // todo: find something to manage this
          }));
        } else {
          this.store.dispatch(ProgressBarQueueActions.reset());
        }
      })
    ).subscribe();

    this.guessService.guesses$.pipe(
      map(() => {
        this.store.dispatch(ProgressBarQueueActions.queue({
          tasks: 1
        }));
      })
    )

    this.store.select(selectActiveTask).pipe(
      map((activeTask: boolean) => {
        if (!activeTask) {
          this.store.dispatch(ProgressBarQueueActions.start());
        }
      })
    ).subscribe();
  }

}

import { Injectable, inject } from '@angular/core';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { Store } from '@ngrx/store';
import { ProgressBarQueueActions } from '../../state/actions/progress-bar-queue.actions';
import { GuessService } from '../guess/guess.service';
import { selectGuesses, selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { lastValueFrom } from 'rxjs';
import { Game } from '../../state/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private gameStore = inject(Store<Game>);

  constructor() {
    this.gameStore.select(selectIsPlayingMusic).subscribe(async (isActive: boolean) => {
      if (isActive) {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.queueTask({
          tasks: await lastValueFrom(this.gameStore.select(selectGuesses))
        }));
      } else {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.resetTasks());
      }
    });

    // this.guessService.guesses$.subscribe(() => {
    //   this.progressBarQueueStore.dispatch(ProgressBarQueueActions.queueTask({
    //     tasks: 1
    //   }));
    // });
  }
}

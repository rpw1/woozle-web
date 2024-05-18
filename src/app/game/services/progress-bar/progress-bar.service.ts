import { Injectable, inject } from '@angular/core';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { Store } from '@ngrx/store';
import { ProgressBarQueueActions } from '../../state/actions/progress-bar-queue.actions';
import { GuessService } from '../guess/guess.service';
import { selectGuesses, selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { lastValueFrom, map, skip, take } from 'rxjs';
import { Game } from '../../state/models/game.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private guessService = inject(GuessService);
  private progressBarQueueStore = inject(Store<ProgressBarQueue>);
  private gameStore = inject(Store<Game>);

  constructor() {
    this.gameStore.select(selectIsPlayingMusic).pipe(skip(1), map(async (isActive: boolean) => {
      console.log('isActive', isActive)
      if (isActive) {
        const tasks = await lastValueFrom(this.gameStore.select(selectGuesses).pipe(take(1)));
        console.log('Chosen Tasks', tasks)
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.queueTask({
          tasks: tasks
        }));
      } else {
        this.progressBarQueueStore.dispatch(ProgressBarQueueActions.resetTasks());
      }
    })).subscribe();

    this.guessService.guesses$.pipe(skip(1)).subscribe(() => {
      this.progressBarQueueStore.dispatch(ProgressBarQueueActions.queueTask({
        tasks: 1
      }));
    });
  }
}

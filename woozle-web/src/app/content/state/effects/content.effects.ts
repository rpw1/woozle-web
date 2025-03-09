import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs';
import { GameActions } from '../../../game/state/actions/game.actions';
import { SpotifyContentService } from '../../services/spotify-content.service';
import { ContentActions } from '../actions/content.actions';

@Injectable()
export class ContentEffects {
  private readonly action$ = inject(Actions);
  private readonly spotifyContentService = inject(SpotifyContentService);

  readonly loadContent$ = createEffect(() =>
    this.action$.pipe(
      ofType(ContentActions.loadContent),
      exhaustMap(() => this.spotifyContentService.loadContent()),
      map((contents) =>
        ContentActions.loadContentSuccess({ availableContent: contents })
      )
    )
  );

  readonly loadTracks$ = createEffect(() =>
    this.action$.pipe(
      ofType(ContentActions.setGameContent),
      switchMap((props) =>
        this.spotifyContentService.loadTracks(props.content)
      ),
      map((tracks) => ContentActions.setGameContentSuccess({ tracks: tracks }))
    )
  );

  readonly setGameContentSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        ContentActions.setGameContentSuccess,
      ),
      switchMap(async (action) => {
        let tracks = [...action.tracks];
        for (let i = tracks.length - 1; i >= 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          const temp = tracks[i];
          tracks[i] = tracks[randomIndex];
          tracks[randomIndex] = temp;
        }

        return GameActions.setGameSolutions({ solutions: tracks });
      })
    )
  );
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap } from 'rxjs';
import { GameActions } from '../../../state/actions/game.actions';
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
}

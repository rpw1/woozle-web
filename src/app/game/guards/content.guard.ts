import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Game } from '../state/models/game.model';
import { selectPlaylist } from '../state/selectors/game.selector';
import { map } from 'rxjs';

export const contentGuard: CanActivateFn = (route, state) => {
  const gameStore = inject(Store<Game>);
  const router = inject(Router);
  const contentListRoute = router.parseUrl('/playlists');
  return gameStore.select(selectPlaylist)
    .pipe(map(x => x.playlistId === ''? new RedirectCommand(contentListRoute) : true));
};

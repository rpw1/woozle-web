import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Game } from '../../game/state/models/game.model';
import { selectContent } from '../../game/state/selectors/game.selector';

export const contentGuard: CanActivateFn = (route, state) => {
  const gameStore = inject(Store<Game>);
  const router = inject(Router);
  const contentListRoute = router.parseUrl('/contents');
  return gameStore.select(selectContent)
    .pipe(
      map(x => x.id === ''? new RedirectCommand(contentListRoute) : true)
    );
};

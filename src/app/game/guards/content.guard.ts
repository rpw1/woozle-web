import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Game } from '../state/models/game.model';
import { selectContent } from '../state/selectors/game.selector';
import { map, tap } from 'rxjs';

export const contentGuard: CanActivateFn = (route, state) => {
  const gameStore = inject(Store<Game>);
  const router = inject(Router);
  const contentListRoute = router.parseUrl('/contents');
  return gameStore.select(selectContent)
    .pipe(
      tap(x => console.log(x)),
      map(x => x.id === ''? new RedirectCommand(contentListRoute) : true)
    );
};

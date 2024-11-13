import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Game } from '../state/models/game.model';
import { selectDevice } from '../state/selectors/game.selector';
import { map } from 'rxjs';

export const deviceGuard: CanActivateFn = (route, state) => {
  const gameStore = inject(Store<Game>);
  const router = inject(Router);
  const devicesRoute = router.parseUrl('/devices');
  return gameStore.select(selectDevice)
    .pipe(map(x => x.id === '' ? new RedirectCommand(devicesRoute) : true));
};

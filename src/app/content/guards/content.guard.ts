import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Game } from '../../game/state/models/game.model';
import { Content } from '../state/models/content';
import { selectGameContent } from '../state/selectors/content.selector';

export const contentGuard: CanActivateFn = (route, state) => {
  const contentStore = inject(Store<Content>);
  const router = inject(Router);
  const contentListRoute = router.parseUrl('/contents');
  return contentStore
    .select(selectGameContent)
    .pipe(
      map((x) => (x.id === '' ? new RedirectCommand(contentListRoute) : true))
    );
};

import { CanActivateFn } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { inject } from '@angular/core';
import { first, mergeMap, of } from 'rxjs';

export const playerGuard: CanActivateFn = (route, state) => {
  const playerService = inject(PlayerService);
  return of(playerService.loadAvailableDevices()).pipe(
    first(),
    mergeMap(() => playerService.playerActive$)
  );
};

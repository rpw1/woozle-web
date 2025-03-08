import { Routes } from "@angular/router";
import { contentGuard } from "../content/guards/content.guard";
import { playerGuard } from './guards/player.guard';

export const gameRoutes: Routes = [
  {
    path: '',
    canActivate: [ contentGuard, playerGuard ],
    loadComponent: () => import('./components/game/game.component')
      .then(x => x.GameComponent)
  },
]
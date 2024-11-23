import { Routes } from "@angular/router";
import { deviceGuard } from "./guards/device.guard";
import { contentGuard } from "../content/guards/content.guard";

export const gameRoutes: Routes = [
  {
    path: '',
    canActivate: [ deviceGuard, contentGuard ],
    loadComponent: () => import('./components/game/game.component')
      .then(x => x.GameComponent)
  },
]
import { Routes } from "@angular/router";
import { deviceGuard } from "./guards/device.guard";
import { contentGuard } from "../content/guards/content.guard";

export const gameRoutes: Routes = [
  {
    path: 'devices',
    loadComponent: () => import('./components/device-list/device-list.component')
      .then(x => x.DeviceListComponent),
  },
  {
    path: '',
    canActivate: [ deviceGuard, contentGuard ],
    loadComponent: () => import('./components/game/game.component')
      .then(x => x.GameComponent)
  },
]
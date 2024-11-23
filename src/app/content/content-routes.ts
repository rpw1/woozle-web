import { Routes } from "@angular/router";
import { deviceGuard } from "../game/guards/device.guard";

export const contentRoutes: Routes = [
  {
    path: 'select',
    canActivate: [ deviceGuard ],
    loadComponent: () => import('./components/content-list/content-list.component')
      .then(x => x.ContentListComponent),
  },
]
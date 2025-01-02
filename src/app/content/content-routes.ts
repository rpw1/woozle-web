import { Routes } from "@angular/router";
import { deviceGuard } from "../game/guards/device.guard";
import { availableContentResolver } from './resolvers/available-content.resolver';

export const contentRoutes: Routes = [
  {
    path: 'select',
    canActivate: [ deviceGuard ],
    resolve: { data: availableContentResolver },
    loadComponent: () => import('./components/content-list/content-list.component')
      .then(x => x.ContentListComponent),
  },
]
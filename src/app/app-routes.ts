import { Routes } from "@angular/router";
import { ForbiddenComponent } from "./auth/components/forbidden/forbidden.component";
import { authGuard } from "./auth/guards/auth.guard";
import { authCallbackResolver } from "./auth/resolvers/auth-callback.resolver";
import { deviceGuard } from './game/guards/device.guard';
import { contentGuard } from './content/guards/content.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'devices',
    pathMatch: 'full'
  },
  {
    path: 'devices',
    canActivate: [ authGuard ],
    loadComponent: () => import('./game/components/device-list/device-list.component')
      .then(x => x.DeviceListComponent),
  },
  {
    path: 'contents',
    canActivate: [ authGuard, deviceGuard ],
    loadComponent: () => import('./content/components/content-list/content-list.component')
      .then(x => x.ContentListComponent),
  },
  {
    path: 'game',
    canActivate: [ authGuard, deviceGuard, contentGuard ],
    loadComponent: () => import('./game/components/game/game.component')
      .then(x => x.GameComponent)
  },
  {
    path: 'auth/callback',
    resolve: { data: authCallbackResolver },
    loadComponent: () => ForbiddenComponent
  },
  {
    path: 'forbidden',
    loadComponent: () => ForbiddenComponent
  }
];

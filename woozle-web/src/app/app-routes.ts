import { Routes } from "@angular/router";
import { ForbiddenComponent } from "./shared/components/forbidden/forbidden.component";
import { authGuard } from "./user/guards/auth.guard";
import { authCallbackResolver } from "./resolvers/auth-callback.resolver";
import { homeRoutes } from './home/home-routes';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => homeRoutes
  },
  {
    path: 'game',
    canActivateChild: [ authGuard ],
    loadChildren: () => import('./game/game-routes').then(x => x.gameRoutes)
  },
  {
    path: 'devices',
    canActivateChild: [ authGuard ],
    loadChildren: () => import('./devices/devices-routes').then(x => x.devicesRoutes)
  },
  {
    path: 'contents',
    canActivateChild: [ authGuard ],
    loadChildren: () => import('./content/content-routes').then(x => x.contentRoutes)
  },
  {
    path: 'user',
    canActivateChild: [ authGuard ],
    loadChildren: () => import('./user/user-routes').then(x => x.userRoutes)
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
]

import { Routes } from '@angular/router';
import { ContentsStore } from './game/content/state/contents.state';
import { homeRoutes } from './home/home-routes';
import { authCallbackResolver } from './resolvers/auth-callback.resolver';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { authGuard } from './shared/guards/auth.guard';
import { TracksStore } from './game/content/state/tracks.state';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => homeRoutes,
  },
  {
    path: 'game',
    canActivateChild: [authGuard],
    loadChildren: () => import('./game/game-routes').then((x) => x.gameRoutes),
  },
  {
    path: 'contents',
    canActivateChild: [authGuard],
    loadChildren: () =>
      import('./game/content/content-routes').then((x) => x.contentRoutes),
    providers: [ContentsStore],
  },
  {
    path: 'auth/callback',
    resolve: { data: authCallbackResolver },
    loadComponent: () => ForbiddenComponent,
  },
  {
    path: 'forbidden',
    loadComponent: () => ForbiddenComponent,
  },
];

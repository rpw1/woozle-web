import { Routes } from "@angular/router";
import { authCallbackResolver } from "./auth/resolvers/auth-callback.resolver";
import { authGuard } from "./auth/guards/auth.guard";
import { ForbiddenComponent } from "./auth/components/forbidden/forbidden.component";
import { trackResolver } from "./auth/resolvers/track.resolver";

export const routes: Routes = [
  {
    path: '',
    canActivate: [ authGuard ],
    resolve: { tracks: trackResolver },
    loadComponent: () => import('./game/components/game/game.component').then(x => x.GameComponent)
  },
  {
    path: 'auth/callback',
    resolve: {data: authCallbackResolver},
    loadComponent: () => ForbiddenComponent
  },
  {
    path: 'forbidden',
    loadComponent: () => ForbiddenComponent
  }
];
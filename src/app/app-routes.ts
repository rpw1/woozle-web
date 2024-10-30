import { Routes } from "@angular/router";
import { ForbiddenComponent } from "./auth/components/forbidden/forbidden.component";
import { authGuard } from "./auth/guards/auth.guard";
import { authCallbackResolver } from "./auth/resolvers/auth-callback.resolver";
import { trackResolver } from "./auth/resolvers/track.resolver";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'playlists',
    pathMatch: 'full'
  },
  {
    path: 'playlists',
    canActivate: [ authGuard ],
    loadComponent: () => import('./game/components/playlist-list/playlist-list.component')
      .then(x => x.PlaylistListComponent),
  },
  {
    path: 'game',
    canActivate: [ authGuard ],
    resolve: { tracks: trackResolver },
    loadComponent: () => import('./game/components/game/game.component')
      .then(x => x.GameComponent)
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

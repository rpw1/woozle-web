import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: '',
    loadComponent: () => import('./game/components/game/game.component').then(x => x.GameComponent)
  }
];
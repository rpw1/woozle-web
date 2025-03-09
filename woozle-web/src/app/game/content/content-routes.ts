import { Routes } from "@angular/router";
import { availableContentResolver } from './resolvers/available-content.resolver';

export const contentRoutes: Routes = [
  {
    path: 'select',
    resolve: { data: availableContentResolver },
    loadComponent: () => import('./components/content-list/content-list.component')
      .then(x => x.ContentListComponent),
  },
]
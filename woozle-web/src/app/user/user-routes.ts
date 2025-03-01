import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: 'releaseNotes',
    loadComponent: () =>
      import('./components/release-notes/release-notes.component').then(
        (x) => x.ReleaseNotesComponent
      ),
  },
];

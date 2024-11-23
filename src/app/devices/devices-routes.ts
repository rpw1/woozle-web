import { Routes } from "@angular/router";

export const devicesRoutes: Routes = [
  {
    path: 'select',
    loadComponent: () => import('../devices/components/device-list/device-list.component')
      .then(x => x.DeviceListComponent),
  },
]
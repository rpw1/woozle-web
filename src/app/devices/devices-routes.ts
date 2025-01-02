import { Routes } from "@angular/router";
import { availableDevicesResolver } from './resolvers/available-devices.resolver';

export const devicesRoutes: Routes = [
  {
    path: 'select',
    resolve: { data: availableDevicesResolver },
    loadComponent: () => import('../devices/components/device-list/device-list.component')
      .then(x => x.DeviceListComponent),
  },
]
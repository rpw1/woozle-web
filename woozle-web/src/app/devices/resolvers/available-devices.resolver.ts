import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AvailableDevicesService } from '../state/available-devices.service';

export const availableDevicesResolver: ResolveFn<boolean> = async (route, state) => {
  const availableDevicesService = inject(AvailableDevicesService);
  await availableDevicesService.loadAvailableDevices();
  return true;
};

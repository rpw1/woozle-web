import { TestBed } from '@angular/core/testing';

import { AvailableDevicesService } from './available-devices.service';

describe('AvailableDevicesService', () => {
  let service: AvailableDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

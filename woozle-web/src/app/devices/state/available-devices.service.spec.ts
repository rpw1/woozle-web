import { TestBed } from '@angular/core/testing';

import { AvailableDevicesService } from './available-devices.service';
import { MockProvider } from 'ng-mocks';
import { SpotifyService } from '../../shared/services/spotify.service';

describe('AvailableDevicesService', () => {
  let service: AvailableDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(SpotifyService)
      ]
    });
    service = TestBed.inject(AvailableDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

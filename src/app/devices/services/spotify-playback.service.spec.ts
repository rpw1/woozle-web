import { TestBed } from '@angular/core/testing';

import { SpotifyPlaybackService } from './spotify-playback.service';

describe('SpotifyPlaybackService', () => {
  let service: SpotifyPlaybackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyPlaybackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

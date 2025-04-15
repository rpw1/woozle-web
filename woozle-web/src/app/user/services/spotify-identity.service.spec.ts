import { TestBed } from '@angular/core/testing';
import { SpotifyIdentityService } from './spotify-identity.service';

describe('SpotifyIdentityService', () => {
  let service: SpotifyIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

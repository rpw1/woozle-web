import { TestBed } from '@angular/core/testing';
import { SpotifyIdentityService } from './spotify-identity.service';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('SpotifyIdentityService', () => {
  let service: SpotifyIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(HttpClient)
      ]
    });
    service = TestBed.inject(SpotifyIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

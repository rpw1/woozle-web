import { TestBed } from '@angular/core/testing';
import { SpotifyService } from './spotify.service';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('SpotifyService', () => {
  let service: SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(HttpClient)
      ]
    });
    service = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

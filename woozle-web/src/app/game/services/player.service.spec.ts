import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { SpotifyService } from '../../shared/services/spotify.service';
import { MockProvider } from 'ng-mocks';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(SpotifyService)]
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

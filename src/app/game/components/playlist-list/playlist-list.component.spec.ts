import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { PlaylistComponent } from '../playlist/playlist.component';
import { PlaylistListComponent } from './playlist-list.component';

describe('PlaylistListComponent', () => {
  let component: PlaylistListComponent;
  let fixture: ComponentFixture<PlaylistListComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockComponent(PlaylistComponent),
        CommonModule,
        PlaylistListComponent
      ],
      providers: [
        provideMockStore(),
        MockProvider(SpotifyService)
      ]
    })
    .compileComponents();
    spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
    spotifyServiceSpy.getCurrentUserPlaylists.and.returnValue(of())
    fixture = TestBed.createComponent(PlaylistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { getFakeGame } from '../../../testing/fake-game.models';
import { Game } from '../../state/models/game.model';
import { selectDevice } from '../../state/selectors/game.selector';
import { ContentComponent } from '../content/content.component';
import { ContentListComponent } from './content-list.component';

describe('ContentListComponent', () => {
  let component: ContentListComponent;
  let fixture: ComponentFixture<ContentListComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;
  let mockStore: MockStore<Store<Game>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockComponent(ContentComponent),
        CommonModule,
        ContentListComponent,
        RouterLink
      ],
      providers: [
        provideMockStore(),
        MockProvider(SpotifyService),
        MockProvider(ActivatedRoute)
      ]
    })
    .compileComponents();
    spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
    //spotifyServiceSpy.getCurrentUserPlaylists.and.returnValue(of());
    mockStore = TestBed.inject(MockStore<Store<Game>>)
    mockStore.overrideSelector(selectDevice, getFakeGame().device);
    fixture = TestBed.createComponent(ContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    document.body.removeChild(fixture.debugElement.nativeNode);
  });
});

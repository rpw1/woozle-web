import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { MockComponent, MockProvider } from 'ng-mocks';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { provideMockStore } from '@ngrx/store/testing';
import { DeviceComponent } from '../device/device.component';
import { of } from 'rxjs';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  let spotifyServiceSpy: jasmine.SpyObj<SpotifyService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeviceListComponent,
        MockComponent(DeviceComponent)
      ],
      providers: [
        MockProvider(SpotifyService),
        provideMockStore()
      ]
    })
    .compileComponents();

    spotifyServiceSpy = TestBed.inject(SpotifyService) as jasmine.SpyObj<SpotifyService>;
    spotifyServiceSpy.getAvailableDevices.and.returnValue(of())
    fixture = TestBed.createComponent(DeviceListComponent);
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceComponent } from './device.component';

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    component.device = {
      id: 'deviceId',
      is_restricted: false,
      is_active: true,
      is_private_session: false,
      name: 'Woozle player',
      supports_volume: true,
      type: 'Computer',
      volume_percent: 50
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    document.body.removeChild(fixture.debugElement.nativeNode);
  });
});

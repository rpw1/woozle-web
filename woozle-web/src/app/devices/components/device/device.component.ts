import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyDevice } from '../../../shared/models/spotify-device';

@Component({
  selector: 'app-device',
  imports: [],
  templateUrl: './device.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceComponent {
  @Input({required: true}) device!: SpotifyDevice;
  @Output() selectedDevice = new EventEmitter<SpotifyDevice>();
}

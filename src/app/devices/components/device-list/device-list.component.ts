import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions } from '../../../game/state/actions/game.actions';
import { Game } from '../../../game/state/models/game.model';
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { AvailableDevicesService } from '../../state/available-devices.service';
import { DeviceComponent } from '../device/device.component';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    DeviceComponent
  ],
  templateUrl: './device-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceListComponent {
  private readonly availableDevicesService = inject(AvailableDevicesService);
  private readonly gameStore = inject(Store<Game>);
  private readonly router = inject(Router);
  devices$ = this.availableDevicesService.availableDevices$;

  setDevice(device: SpotifyDevice) {
    this.gameStore.dispatch(GameActions.loadDevice({ device: device }));
    void this.router.navigate(['/contents/select']);
  }
}

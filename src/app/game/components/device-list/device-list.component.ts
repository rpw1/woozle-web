import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { defer } from 'rxjs';
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { GameActions } from '../../state/actions/game.actions';
import { CommonModule } from '@angular/common';
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
  private readonly game = inject(Store<Game>);
  private readonly router = inject(Router);
  private readonly spotifyService = inject(SpotifyService);
  devices$ = defer(() => this.spotifyService.getAvailableDevices());

  setDevice(device: SpotifyDevice) {
    this.game.dispatch(GameActions.loadDevice({ device: device }));
    void this.router.navigate(['/playlists']);
  }
}

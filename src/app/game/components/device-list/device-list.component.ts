import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../shared/services/spotify.service';
import { defer } from 'rxjs';
import { SpotifyDevice } from '../../../shared/models/spotify-device';
import { GameActions } from '../../state/actions/game.actions';
import { CommonModule } from '@angular/common';
import { DeviceComponent } from '../device/device.component';
import { ContentActions } from '../../../content/state/actions/content.actions';

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
export class DeviceListComponent implements OnInit {
  private readonly gameStore = inject(Store<Game>);
  private readonly router = inject(Router);
  private readonly spotifyService = inject(SpotifyService);
  devices$ = defer(() => this.spotifyService.getAvailableDevices());

  ngOnInit(): void {
    this.gameStore.dispatch(ContentActions.loadContent())
  }

  setDevice(device: SpotifyDevice) {
    this.gameStore.dispatch(GameActions.loadDevice({ device: device }));
    void this.router.navigate(['/contents']);
  }
}

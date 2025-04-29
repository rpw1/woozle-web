import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { GameStore } from './game/state/game.state';
import { ProgressBarQueueStore } from './game/state/progress-bar-queue.state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  providers: [GameStore, ProgressBarQueueStore],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

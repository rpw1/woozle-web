import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { GameStore } from './game/state/game.state';
import { ProgressBarStateService } from './game/state/progress-bar-state.service';
import { ToastComponent } from "./shared/components/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ToastComponent],
  providers: [GameStore, ProgressBarStateService],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}

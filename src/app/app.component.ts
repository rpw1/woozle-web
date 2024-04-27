import { Component, inject } from '@angular/core';
import { GuessListComponent } from './game/components/guess-list/guess-list.component';
import { GuessComponent } from './game/components/guess/guess.component';
import { ProgressBarComponent } from './game/components/progress-bar/progress-bar.component';
import { PlayerService } from './game/services/player/player.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GuessListComponent, 
    GuessComponent,
    ProgressBarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private playerService = inject(PlayerService);
  isPlaying$ = this.playerService.player$;

  togglePlayer() {
    this.playerService.togglePlayer();
  }
}

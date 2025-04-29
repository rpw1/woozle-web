import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TracksStore } from '../../content/state/tracks.state';
import { GameActions } from '../../state/actions/game.actions';
import { Game } from '../../state/models/game.model';
import { selectIsPlayingMusic } from '../../state/selectors/game.selector';
import { GuessListComponent } from '../guess-list/guess-list.component';
import { GuessComponent } from '../guess/guess.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { GameStore } from '../../state/game.state';

@Component({
  selector: 'app-game',
  imports: [
    GuessListComponent,
    GuessComponent,
    ProgressBarComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameStore = inject(GameStore);
  private readonly tracksStore = inject(TracksStore);
  readonly isPlayingMusic = this.gameStore.isPlayingMusic;
  readonly selectedContentName = this.tracksStore.contentName;

  ngOnInit(): void {
    this.gameStore.reset();
  }

  ngOnDestroy(): void {
    this.gameStore.togglePlayerOff();
  }

  togglePlayerOn(): void {
    this.gameStore.togglePlayerOn();
  }

  togglePlayerOff(): void {
    this.gameStore.togglePlayerOff();
  }
}

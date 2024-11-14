import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions } from '../../../game/state/actions/game.actions';
import { Content } from '../../../game/state/models/content';
import { Game } from '../../../game/state/models/game.model';
import { selectAvailableContents, selectDevice } from '../../../game/state/selectors/game.selector';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    CommonModule,
    ContentComponent,
    RouterLink
  ],
  templateUrl: './content-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentListComponent {
  private readonly gameStore = inject(Store<Game>);
  private readonly router = inject(Router);
  readonly availableContents$ = this.gameStore.select(selectAvailableContents);
  readonly selectedDevice$ = this.gameStore.select(selectDevice);

  setContent(content: Content) {
    this.gameStore.dispatch(GameActions.reset());
    this.gameStore.dispatch(GameActions.loadContent({ content: content }));
    void this.router.navigate(['/game']);
  }
}

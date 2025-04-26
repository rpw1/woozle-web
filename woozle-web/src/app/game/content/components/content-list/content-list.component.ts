import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ContentsStore,
  GoodContentFilters,
  GoodContentFilterType,
} from '../../state/contents.state';
import { GoodContent } from '../../state/models/good-content';
import { ContentComponent } from '../content/content.component';
import { TracksStore } from '../../state/tracks.state';
import { GameActions } from '../../../state/actions/game.actions';
import { Store } from '@ngrx/store';
import { Game } from '../../../state/models/game.model';

@Component({
  selector: 'app-content-list',
  imports: [CommonModule, ContentComponent, NgbNavModule, ReactiveFormsModule],
  templateUrl: './content-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentListComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contentsStore = inject(ContentsStore);
  private readonly tracksStore = inject(TracksStore);
  private readonly router = inject(Router);
  private readonly gameStore = inject(Store<Game>);
  readonly availableAlbums = this.contentsStore.artists;
  readonly availableArtists = this.contentsStore.albums;
  readonly availablePlaylists = this.contentsStore.playlists;

  readonly contentSearchForm = this.formBuilder.group({
    contentSearchInput: ['', [Validators.maxLength(500)]],
  });
  get contentSearchInput() {
    return this.contentSearchForm.get('contentSearchInput');
  }

  search() {
    const filters: GoodContentFilters = {
      filterType: GoodContentFilterType.Recent,
      name: this.contentSearchInput?.value,
    };
    this.contentsStore.updateFilters(filters);
  }

  async setContent(content: GoodContent) {
    await this.tracksStore.loadTracks(content);
    this.gameStore.dispatch(
      GameActions.setGameSolutions({
        solutions: this.tracksStore.randomTracks(),
      })
    );

    void this.router.navigate(['/game']);
  }
}

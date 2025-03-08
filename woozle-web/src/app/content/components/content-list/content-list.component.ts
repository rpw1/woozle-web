import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ContentActions } from '../../state/actions/content.actions';
import { Content } from '../../state/models/content';
import { SpotifyContent } from '../../state/models/spotify-content';
import {
  selectAvailableAlbums,
  selectAvailableArtists,
  selectAvailablePlaylists,
} from '../../state/selectors/content.selector';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-content-list',
  imports: [
    CommonModule,
    ContentComponent,
    NgbNavModule,
    ReactiveFormsModule,
  ],
  templateUrl: './content-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentListComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contentStore = inject(Store<Content>);
  private readonly router = inject(Router);
  readonly availableAlbums$ = this.contentStore.select(selectAvailableAlbums);
  readonly availableArtists$ = this.contentStore.select(selectAvailableArtists);
  readonly availablePlaylists$ = this.contentStore.select(
    selectAvailablePlaylists
  );

  readonly contentSearchForm = this.formBuilder.group({
    contentSearchInput: ['', [Validators.maxLength(500)]],
  });
  get contentSearchInput() {
    return this.contentSearchForm.get('contentSearchInput');
  }

  search() {
    this.contentStore.dispatch(
      ContentActions.searchAvailableContent({
        filters: { name: this.contentSearchInput?.value ?? '' },
      })
    );
  }

  setContent(content: SpotifyContent) {
    this.contentStore.dispatch(
      ContentActions.setGameContent({ content: content })
    );
    void this.router.navigate(['/game']);
  }
}

import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Content } from '../models/content';
import { SpotifyContentService } from '../../services/spotify-content.service';

@Injectable()
export class ContentEffects {
  private readonly action$ = inject(Actions);
  private readonly contentStore = inject(Store<Content>);
  private readonly spotifyContentService = inject(SpotifyContentService);
}

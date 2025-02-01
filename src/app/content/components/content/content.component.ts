import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SpotifyContent } from '../../state/models/spotify-content';

@Component({
    selector: 'app-content',
    imports: [],
    templateUrl: './content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @Input({ required: true }) content!: SpotifyContent;
  @Output() selectedContent = new EventEmitter<SpotifyContent>();
}

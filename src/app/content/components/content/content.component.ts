import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyContent } from '../../state/models/spotify-content';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @Input({required: true}) content!: SpotifyContent;
  @Output() selectedContent = new EventEmitter<SpotifyContent>();
}

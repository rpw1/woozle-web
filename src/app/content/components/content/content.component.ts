import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Content } from '../../../game/state/models/content';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @Input({required: true}) content!: Content;
  @Output() selectedContent = new EventEmitter<Content>();
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { GoodContent } from '../../state/models/good-content';

@Component({
  selector: 'app-content',
  imports: [],
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  content = input.required<GoodContent>();
  selectedContent = output<GoodContent>();
}

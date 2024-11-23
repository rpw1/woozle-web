import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-release-notes',
  standalone: true,
  imports: [],
  templateUrl: './release-notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseNotesComponent {

}

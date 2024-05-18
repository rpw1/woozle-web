import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameCalculationService } from '../../services/game-calculation/game-calculation.service';
import { ProgressSegmentComponent } from '../progress-segment/progress-segment.component';
import { ProgressBarService } from '../../services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSegmentComponent
  ],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  private gameCalculationService = inject(GameCalculationService);
  guessPercentArray: number[] = this.gameCalculationService.getGamePercentageArray();

  private progressBarService = inject(ProgressBarService);

}
import { Component, Input } from '@angular/core';
import { Guess } from '../../models/guess/guess';
import { GuessType } from '../../models/guess/guess-type';

@Component({
  selector: 'app-guess-item',
  standalone: true,
  imports: [],
  templateUrl: './guess-item.component.html',
  styleUrl: './guess-item.component.scss'
})
export class GuessItemComponent {
  @Input() guess: Guess | undefined;

  guessType = GuessType;
  
}

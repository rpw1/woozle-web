import { Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { GameConstants } from '../../models/constants';
import { GuessService } from '../../services/game/guess/guess.service';
import { Subscription } from 'rxjs';
import { Guess } from '../../models/guess';

@Component({
  selector: 'app-guess-list',
  templateUrl: './guess-list.component.html',
  styleUrls: ['./guess-list.component.scss']
})
export class GuessListComponent implements OnDestroy {
  guessArray: number[] = GameConstants.SECONDS_ARRAY;
  private currentIndex = 0;
  private subscriptions: Subscription[] = [];
  @ViewChildren('guessListItems') guessListItems!: QueryList<ElementRef<HTMLDListElement>>;

  constructor(private guessService: GuessService) {
    this.subscriptions.push(this.guessService.guess$.subscribe((guess: Guess) => {
      let guessText = '';
      if (guess.song !== undefined) {
        guessText = guess.song;
      }
      this.setGuessText(guessText);
    }));
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  setGuessText(text: string) {
    const guessItem = (this.guessListItems.get(this.currentIndex)?.nativeElement as HTMLDListElement);
    console.log(guessItem)
    guessItem.innerText = text;
    guessItem.classList.add('disabled');
    this.currentIndex += 1;
  }
}

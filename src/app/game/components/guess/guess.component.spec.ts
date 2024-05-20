import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GuessType } from '../../models/guess-type';
import { GuessComponent } from './guess.component';
import { provideMockStore } from '@ngrx/store/testing'
import { initialState } from '../../state/reducers/game.reducer';
import { deepClone } from 'fast-json-patch';

describe('GuessComponent', () => {
  let component: GuessComponent;
  let fixture: ComponentFixture<GuessComponent>;
  const state = deepClone(initialState)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FormsModule, GuessComponent],
    providers: [
      provideMockStore(state)
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(GuessComponent);
    component = fixture.componentInstance;
    component.currentGuess = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update currentGuess on guessInput input', () => {
    const testInput = 'my test input';
    const guessInput: HTMLInputElement = fixture.debugElement.query(By.css('#guessInput')).nativeElement;
    fixture.detectChanges();

    guessInput.value = testInput;
    guessInput.dispatchEvent(new Event('input'));
    expect(component.currentGuess).toBe(testInput);
  });

  it('should clear the current guess after any guess is made', () => {
    component.currentGuess = 'myCurrentGuess';
    component.submitGuess(GuessType.GUESS);
    expect(component.currentGuess).toBe('');

    component.currentGuess = 'myCurrentGuess';
    component.submitGuess(GuessType.SKIP);
    expect(component.currentGuess).toBe('');
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GuessType } from '../../models/guess-type';
import { GuessService } from '../../services/guess/guess.service';
import { GuessComponent } from './guess.component';

describe('GuessComponent', () => {
  let component: GuessComponent;
  let fixture: ComponentFixture<GuessComponent>;
  let guessServiceSpy: jasmine.SpyObj<GuessService>;

  beforeEach(async () => {
    guessServiceSpy = jasmine.createSpyObj('GuessService', ['makeGuess']);
    await TestBed.configureTestingModule({
    imports: [FormsModule, GuessComponent],
    providers: [{ provide: GuessService, useValue: guessServiceSpy }]
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

  it('should call make guess using the guess type passed in the function', () => {
    const currentGuess = 'current guess'
    component.currentGuess = currentGuess;
    component.submitGuess(GuessType.GUESS);
    const guess = {
      type: GuessType.GUESS,
      song: currentGuess
    };
    expect(guessServiceSpy.makeGuess).toHaveBeenCalledWith(guess);

    component.currentGuess = currentGuess;
    component.submitGuess(GuessType.SKIP);
    const skip = {
      type: GuessType.SKIP,
      song: 'SKIPPED'
    };
    expect(guessServiceSpy.makeGuess).toHaveBeenCalledWith(skip);
  });

  it('should trim guess before submitting a guess', () => {
    component.currentGuess = ' My Untrimmed guess   ';
    component.submitGuess(GuessType.GUESS);
    let testGuess = {
      type: GuessType.GUESS,
      song: 'My Untrimmed guess'
    };
    expect(guessServiceSpy.makeGuess).toHaveBeenCalledWith(testGuess);
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

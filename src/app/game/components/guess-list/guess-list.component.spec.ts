import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { deepClone } from 'fast-json-patch';
import { initialState } from '../../state/reducers/game.reducer';
import { GuessListComponent } from './guess-list.component';
import { Game } from '../../state/models/game.model';
import { Store } from '@ngrx/store';
import { selectGuesses } from '../../state/selectors/game.selector';
import { getFakeGame } from '../../../testing/fake-game.models';

describe('GuessListComponent', () => {
  let component: GuessListComponent;
  let fixture: ComponentFixture<GuessListComponent>;
  let mockStore: MockStore<Store<Game>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [GuessListComponent],
    providers: [
      provideMockStore()
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(GuessListComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore<Store<Game>>)
    mockStore.overrideSelector(selectGuesses, getFakeGame().guesses);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

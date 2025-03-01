import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProgressSegmentComponent } from './progress-segment.component';
import { Store } from '@ngrx/store';
import { Game } from '../../state/models/game.model';
import { selectGuesses, selectNumberOfGuesses } from '../../state/selectors/game.selector';
import { getFakeGame, getFakeProgressBarQueue } from '../../../testing/fake-game.models';
import { ProgressBarQueue } from '../../state/models/progress-bar-queue.model';
import { selectQueueState } from '../../state/selectors/progress-bar-queue.selector';

describe('ProgressSegmentComponent', () => {
  let component: ProgressSegmentComponent;
  let fixture: ComponentFixture<ProgressSegmentComponent>;
  let mockGameStore: MockStore<Store<Game>>;
  let mockProgressBarQueueStore: MockStore<Store<ProgressBarQueue>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSegmentComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressSegmentComponent);
    component = fixture.componentInstance;

    mockGameStore = TestBed.inject(MockStore<Store<Game>>)
    mockGameStore.overrideSelector(selectNumberOfGuesses, getFakeGame().numberOfGuesses);

    mockProgressBarQueueStore = TestBed.inject(MockStore<Store<ProgressBarQueue>>)
    mockProgressBarQueueStore.overrideSelector(selectQueueState, getFakeProgressBarQueue());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    document.body.removeChild(fixture.debugElement.nativeNode);
  });
});

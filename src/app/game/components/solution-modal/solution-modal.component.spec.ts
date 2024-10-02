import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolutionModalComponent } from './solution-modal.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Game } from '../../state/models/game.model';
import { Store } from '@ngrx/store';
import { selectCurrentGameState, selectSolution } from '../../state/selectors/game.selector';
import { getFakeGame } from '../../../testing/fake-game.models';

describe('SolutionModalComponent', () => {
  let component: SolutionModalComponent;
  let fixture: ComponentFixture<SolutionModalComponent>;
  let mockStore: MockStore<Store<Game>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SolutionModalComponent,
        CommonModule,
      ],
      providers: [
        NgbActiveModal,
        provideMockStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionModalComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore<Store<Game>>)
    mockStore.overrideSelector(selectCurrentGameState, getFakeGame().currentGameState);
    mockStore.overrideSelector(selectSolution, getFakeGame().solution);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

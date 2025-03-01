import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProgressBarTimerService } from './progress-bar-timer.service';
import { initialState } from '../state/reducers/progress-bar-queue.reducer';
import { deepClone } from '../../shared/utilities/deep-clone';

describe('ProgressBarTimerService', () => {
  let service: ProgressBarTimerService;
  const state = deepClone(initialState)

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(state)
      ]
    });
    service = TestBed.inject(ProgressBarTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

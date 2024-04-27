import { TestBed } from '@angular/core/testing';

import { ProgressBarTimerService } from './progress-bar-timer.service';

describe('ProgressBarTimerService', () => {
  let service: ProgressBarTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

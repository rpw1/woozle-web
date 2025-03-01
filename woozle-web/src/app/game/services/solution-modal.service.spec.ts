import { TestBed } from '@angular/core/testing';

import { SolutionModalService } from './solution-modal.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('SolutionModalService', () => {
  let service: SolutionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    });
    service = TestBed.inject(SolutionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

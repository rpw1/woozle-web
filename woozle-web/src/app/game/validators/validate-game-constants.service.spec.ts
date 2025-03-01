import { TestBed } from '@angular/core/testing';

import { ValidateGameConstantsService } from './validate-game-constants.service';

describe('ValidateGameConstantsService', () => {
  let service: ValidateGameConstantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateGameConstantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GameCalculationService } from './game-calculation.service';

describe('GameCalculationService', () => {
  let service: GameCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

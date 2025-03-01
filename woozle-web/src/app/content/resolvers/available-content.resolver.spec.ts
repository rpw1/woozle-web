import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { availableContentResolver } from './available-content.resolver';

describe('availableContentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
    TestBed.runInInjectionContext(() => availableContentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

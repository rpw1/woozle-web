import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { authCallbackResolver } from './auth-callback.resolver';

describe('authCallbackResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => authCallbackResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { availableDevicesResolver } from './available-devices.resolver';

describe('availableDevicesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
    TestBed.runInInjectionContext(() => availableDevicesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

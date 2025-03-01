import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(HttpClient)
      ]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

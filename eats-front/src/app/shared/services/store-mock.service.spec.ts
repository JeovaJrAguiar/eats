import { TestBed } from '@angular/core/testing';

import { StoreMockService } from './store-mock.service';

describe('StoreMockService', () => {
  let service: StoreMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

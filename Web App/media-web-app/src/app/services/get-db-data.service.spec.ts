import { TestBed } from '@angular/core/testing';

import { GetDbDataService } from './get-db-data.service';

describe('GetDbDataService', () => {
  let service: GetDbDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDbDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

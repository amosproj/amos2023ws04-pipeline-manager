import { TestBed } from '@angular/core/testing';

import { ResultSearchService } from './result-search.service';

describe('ResultSearchService', () => {
  let service: ResultSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

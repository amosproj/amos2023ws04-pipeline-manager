import { TestBed } from '@angular/core/testing';

import { DatapipelineService } from './datapipeline.service';

describe('DatapipelineService', () => {
  let service: DatapipelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapipelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

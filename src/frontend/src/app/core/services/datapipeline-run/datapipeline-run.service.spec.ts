import { TestBed } from '@angular/core/testing';

import { DatapipelineRunService } from './datapipeline-run.service';

describe('DatapipelineRunService', () => {
  let service: DatapipelineRunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatapipelineRunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

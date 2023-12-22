import { TestBed } from '@angular/core/testing';

import { AirflowService } from './airflow.service';

describe('AirflowService', () => {
  let service: AirflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

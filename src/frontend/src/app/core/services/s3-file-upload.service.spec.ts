import { TestBed } from '@angular/core/testing';

import { S3FileUploadService } from './s3-file-upload.service';

describe('S3FileUploadService', () => {
  let service: S3FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

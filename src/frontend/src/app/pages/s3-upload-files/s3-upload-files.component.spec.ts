import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3UploadFilesComponent } from './s3-upload-files.component';

describe('S3UploadFilesComponent', () => {
  let component: S3UploadFilesComponent;
  let fixture: ComponentFixture<S3UploadFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [S3UploadFilesComponent]
    });
    fixture = TestBed.createComponent(S3UploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

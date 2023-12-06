import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListS3bucketfilesComponent } from './list-s3bucketfiles.component';

describe('ListS3bucketfilesComponent', () => {
  let component: ListS3bucketfilesComponent;
  let fixture: ComponentFixture<ListS3bucketfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListS3bucketfilesComponent]
    });
    fixture = TestBed.createComponent(ListS3bucketfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

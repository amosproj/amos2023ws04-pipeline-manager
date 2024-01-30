import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileResultsComponent } from './file-results.component';

describe('FileResultsComponent', () => {
  let component: FileResultsComponent;
  let fixture: ComponentFixture<FileResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileResultsComponent]
    });
    fixture = TestBed.createComponent(FileResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

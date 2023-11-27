import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatapipelineComponent } from './edit-datapipeline.component';

describe('EditDatapipelineComponent', () => {
  let component: EditDatapipelineComponent;
  let fixture: ComponentFixture<EditDatapipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDatapipelineComponent]
    });
    fixture = TestBed.createComponent(EditDatapipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

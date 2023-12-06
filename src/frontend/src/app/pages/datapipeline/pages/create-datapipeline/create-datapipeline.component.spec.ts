import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatapipelineComponent } from './create-datapipeline.component';

describe('CreateDatapipelineComponent', () => {
  let component: CreateDatapipelineComponent;
  let fixture: ComponentFixture<CreateDatapipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDatapipelineComponent]
    });
    fixture = TestBed.createComponent(CreateDatapipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

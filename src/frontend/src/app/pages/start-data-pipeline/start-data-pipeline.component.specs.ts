import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineComponent } from './start-data-pipeline.component';

describe('PipelineComponent', () => {
  let component: PipelineComponent;
  let fixture: ComponentFixture<PipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipelineComponent]
    });
    fixture = TestBed.createComponent(PipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

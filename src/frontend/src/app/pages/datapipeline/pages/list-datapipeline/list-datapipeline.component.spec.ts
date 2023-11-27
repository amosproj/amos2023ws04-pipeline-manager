import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatapipelineComponent } from './list-datapipeline.component';

describe('ListDatapipelineComponent', () => {
  let component: ListDatapipelineComponent;
  let fixture: ComponentFixture<ListDatapipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDatapipelineComponent]
    });
    fixture = TestBed.createComponent(ListDatapipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

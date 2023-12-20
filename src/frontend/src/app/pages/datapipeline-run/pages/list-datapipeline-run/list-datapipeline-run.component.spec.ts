import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatapipelineRunComponent } from './list-datapipeline-run.component';

describe('ListDatapipelineRunComponent', () => {
  let component: ListDatapipelineRunComponent;
  let fixture: ComponentFixture<ListDatapipelineRunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDatapipelineRunComponent]
    });
    fixture = TestBed.createComponent(ListDatapipelineRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiplineComponent } from './pipline.component';

describe('PiplineComponent', () => {
  let component: PiplineComponent;
  let fixture: ComponentFixture<PiplineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiplineComponent]
    });
    fixture = TestBed.createComponent(PiplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

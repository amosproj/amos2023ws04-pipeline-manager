import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchComponent } from './result-search.component';

describe('ResultSearchComponent', () => {
  let component: ResultSearchComponent;
  let fixture: ComponentFixture<ResultSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultSearchComponent]
    });
    fixture = TestBed.createComponent(ResultSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

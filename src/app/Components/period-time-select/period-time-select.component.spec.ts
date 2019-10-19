import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTimeSelectComponent } from './period-time-select.component';

describe('PeriodTimeSelectComponent', () => {
  let component: PeriodTimeSelectComponent;
  let fixture: ComponentFixture<PeriodTimeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodTimeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodTimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

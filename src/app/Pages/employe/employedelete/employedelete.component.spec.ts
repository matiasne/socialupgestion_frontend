import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedeleteComponent } from './employedelete.component';

describe('EmployedeleteComponent', () => {
  let component: EmployedeleteComponent;
  let fixture: ComponentFixture<EmployedeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployedeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployedeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

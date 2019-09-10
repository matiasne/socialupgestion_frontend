import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployestoreComponent } from './employestore.component';

describe('EmployestoreComponent', () => {
  let component: EmployestoreComponent;
  let fixture: ComponentFixture<EmployestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

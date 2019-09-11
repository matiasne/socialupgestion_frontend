import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeupdateComponent } from './employeupdate.component';

describe('EmployeupdateComponent', () => {
  let component: EmployeupdateComponent;
  let fixture: ComponentFixture<EmployeupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

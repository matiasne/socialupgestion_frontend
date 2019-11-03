import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddPlanComponent } from './service-add-plan.component';

describe('ServiceAddPlanComponent', () => {
  let component: ServiceAddPlanComponent;
  let fixture: ComponentFixture<ServiceAddPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

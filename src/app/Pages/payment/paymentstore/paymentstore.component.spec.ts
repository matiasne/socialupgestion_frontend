import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentstoreComponent } from './paymentstore.component';

describe('PaymentstoreComponent', () => {
  let component: PaymentstoreComponent;
  let fixture: ComponentFixture<PaymentstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

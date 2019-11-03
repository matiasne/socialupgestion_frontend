import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAddPaymentComponent } from './sale-add-payment.component';

describe('SaleAddPaymentComponent', () => {
  let component: SaleAddPaymentComponent;
  let fixture: ComponentFixture<SaleAddPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleAddPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleAddPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

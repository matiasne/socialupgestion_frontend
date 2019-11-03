import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAddServiceComponent } from './sale-add-service.component';

describe('SaleAddServiceComponent', () => {
  let component: SaleAddServiceComponent;
  let fixture: ComponentFixture<SaleAddServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleAddServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

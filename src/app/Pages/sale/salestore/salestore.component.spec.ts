import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalestoreComponent } from './salestore.component';

describe('SalestoreComponent', () => {
  let component: SalestoreComponent;
  let fixture: ComponentFixture<SalestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

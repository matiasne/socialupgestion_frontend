import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleupdateComponent } from './saleupdate.component';

describe('SaleupdateComponent', () => {
  let component: SaleupdateComponent;
  let fixture: ComponentFixture<SaleupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

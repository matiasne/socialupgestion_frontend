import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaledeleteComponent } from './saledelete.component';

describe('SaledeleteComponent', () => {
  let component: SaledeleteComponent;
  let fixture: ComponentFixture<SaledeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaledeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaledeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

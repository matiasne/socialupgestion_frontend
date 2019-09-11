import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaUpdateComponent } from './caja-update.component';

describe('CajaUpdateComponent', () => {
  let component: CajaUpdateComponent;
  let fixture: ComponentFixture<CajaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

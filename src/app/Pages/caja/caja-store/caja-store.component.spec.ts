import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaStoreComponent } from './caja-store.component';

describe('CajaStoreComponent', () => {
  let component: CajaStoreComponent;
  let fixture: ComponentFixture<CajaStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

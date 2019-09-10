import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientstoreComponent } from './clientstore.component';

describe('ClientstoreComponent', () => {
  let component: ClientstoreComponent;
  let fixture: ComponentFixture<ClientstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

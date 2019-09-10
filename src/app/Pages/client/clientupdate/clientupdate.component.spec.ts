import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientupdateComponent } from './clientupdate.component';

describe('ClientupdateComponent', () => {
  let component: ClientupdateComponent;
  let fixture: ComponentFixture<ClientupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

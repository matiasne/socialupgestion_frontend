import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdeleteComponent } from './clientdelete.component';

describe('ClientdeleteComponent', () => {
  let component: ClientdeleteComponent;
  let fixture: ComponentFixture<ClientdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

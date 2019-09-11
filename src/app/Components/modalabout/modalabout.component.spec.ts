import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaboutComponent } from './modalabout.component';

describe('ModalaboutComponent', () => {
  let component: ModalaboutComponent;
  let fixture: ComponentFixture<ModalaboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalaboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

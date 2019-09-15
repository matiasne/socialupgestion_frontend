import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommerceComponent } from './edit-commerce.component';

describe('EditCommerceComponent', () => {
  let component: EditCommerceComponent;
  let fixture: ComponentFixture<EditCommerceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

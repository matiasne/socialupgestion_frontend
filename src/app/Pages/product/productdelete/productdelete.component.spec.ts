import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdeleteComponent } from './productdelete.component';

describe('ProductdeleteComponent', () => {
  let component: ProductdeleteComponent;
  let fixture: ComponentFixture<ProductdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

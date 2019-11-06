import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectCategoryComponent } from './product-select-category.component';

describe('ProductSelectCategoryComponent', () => {
  let component: ProductSelectCategoryComponent;
  let fixture: ComponentFixture<ProductSelectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

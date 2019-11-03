import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceAddCategoryProductComponent } from './commerce-add-category-product.component';

describe('CommerceAddCategoryProductComponent', () => {
  let component: CommerceAddCategoryProductComponent;
  let fixture: ComponentFixture<CommerceAddCategoryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceAddCategoryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceAddCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

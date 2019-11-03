import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceAddCategoryServiceComponent } from './commerce-add-category-service.component';

describe('CommerceAddCategoryServiceComponent', () => {
  let component: CommerceAddCategoryServiceComponent;
  let fixture: ComponentFixture<CommerceAddCategoryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceAddCategoryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceAddCategoryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

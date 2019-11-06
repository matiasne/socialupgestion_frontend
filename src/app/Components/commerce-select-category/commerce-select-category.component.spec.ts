import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceSelectCategoryComponent } from './commerce-select-category.component';

describe('CommerceSelectCategoryComponent', () => {
  let component: CommerceSelectCategoryComponent;
  let fixture: ComponentFixture<CommerceSelectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceSelectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceSelectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceAddPaydeskComponent } from './commerce-add-paydesk.component';

describe('CommerceAddPaydeskComponent', () => {
  let component: CommerceAddPaydeskComponent;
  let fixture: ComponentFixture<CommerceAddPaydeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceAddPaydeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceAddPaydeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

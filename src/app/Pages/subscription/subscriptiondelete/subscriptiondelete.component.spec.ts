import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptiondeleteComponent } from './subscriptiondelete.component';

describe('SubscriptiondeleteComponent', () => {
  let component: SubscriptiondeleteComponent;
  let fixture: ComponentFixture<SubscriptiondeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptiondeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptiondeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

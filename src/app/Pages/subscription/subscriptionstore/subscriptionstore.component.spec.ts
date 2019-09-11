import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionstoreComponent } from './subscriptionstore.component';

describe('SubscriptionstoreComponent', () => {
  let component: SubscriptionstoreComponent;
  let fixture: ComponentFixture<SubscriptionstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

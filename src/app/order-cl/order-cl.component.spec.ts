import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderClComponent } from './order-cl.component';

describe('OrderClComponent', () => {
  let component: OrderClComponent;
  let fixture: ComponentFixture<OrderClComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderClComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

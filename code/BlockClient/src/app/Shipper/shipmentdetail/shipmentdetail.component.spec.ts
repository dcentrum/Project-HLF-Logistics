import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentdetailComponent } from './shipmentdetail.component';

describe('ShipmentdetailComponent', () => {
  let component: ShipmentdetailComponent;
  let fixture: ComponentFixture<ShipmentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

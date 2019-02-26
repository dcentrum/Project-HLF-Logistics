import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentbookingComponent } from './shipmentbooking.component';

describe('ShipmentbookingComponent', () => {
  let component: ShipmentbookingComponent;
  let fixture: ComponentFixture<ShipmentbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

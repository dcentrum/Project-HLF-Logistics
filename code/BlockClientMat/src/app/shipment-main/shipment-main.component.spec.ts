import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentMainComponent } from './shipment-main.component';

describe('ShipmentMainComponent', () => {
  let component: ShipmentMainComponent;
  let fixture: ComponentFixture<ShipmentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmenttrackComponent } from './shipmenttrack.component';

describe('ShipmenttrackComponent', () => {
  let component: ShipmenttrackComponent;
  let fixture: ComponentFixture<ShipmenttrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmenttrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmenttrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

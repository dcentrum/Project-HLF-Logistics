import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShipmentComponent } from './new-shipment.component';

describe('NewShipmentComponent', () => {
  let component: NewShipmentComponent;
  let fixture: ComponentFixture<NewShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

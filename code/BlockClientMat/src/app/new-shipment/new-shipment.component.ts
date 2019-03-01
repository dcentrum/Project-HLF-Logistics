import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BlockService } from '../block.service';
import { ShipmentOrder } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.css']
})
export class NewShipmentComponent implements OnInit {
  IsNew = true;

  shipmentForm: FormGroup;
  shipment: ShipmentOrder;


  bookingNumber = new FormControl('', Validators.required);
  createDate = new FormControl('', Validators.required);
  retailer = new FormControl('', Validators.required);
  manufacturer = new FormControl('', Validators.required);
  deliveryDate = new FormControl('', Validators.required);
  deliveryLocation = new FormControl('', Validators.required);
  pickupDate = new FormControl('', Validators.required);
  pickupLocation = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  notes = new FormControl('', Validators.required);
  errorMessage: any;


  constructor(private blockService: BlockService, private router: Router, fb: FormBuilder) {
    this.shipmentForm = fb.group({
      bookingNumber: this.bookingNumber,
      createDate: this.createDate,
      manufacturer: this.manufacturer,
      retailer: this.retailer,
      deliveryDate: this.deliveryDate,
      pickupDate: this.pickupDate,
      pickupLocation: this.pickupLocation,
      shipper: this.shipper,
      deliveryLocation: this.deliveryLocation,
      notes: this.notes

    });
    this.blockService.updatedTitle("New Shipment")
    this.shipment = new ShipmentOrder();
    this.resetShipment();
  }

  ngOnInit() {
  }
  resetShipment() {
    // this.shipment.BookingNumber=0;
    // this.shipment.BookingDate=new Date("2019-01-01");
  }
  onSubmit(e) {
    this.shipment.BookingNumber=new Date().getMilliseconds()
    this.blockService.addShipment(this.shipment).subscribe((res) => {
      console.log(res)
      this.router.navigateByUrl("shipmentlist");
    });
  }
}

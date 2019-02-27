import { Component, Input, Output, EventEmitter, SimpleChanges,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockService } from '../../block.service'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-shipmentbooking',
  templateUrl: './shipmentbooking.component.html',
  styleUrls: ['./shipmentbooking.component.css']
})
export class ShipmentbookingComponent {

  myForm: FormGroup;
  private shipment;
 

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

  constructor(private BlockService: BlockService, fb: FormBuilder) {
    this.myForm = fb.group({
      bookingNumber: this.bookingNumber,
      createDate: this.createDate,
      retailer: this.retailer,
      deliveryDate: this.deliveryDate,
      pickupDate: this.pickupDate,
      pickupLocation: this.pickupLocation,
      shipper: this.shipper,
      deliveryLocation: this.deliveryLocation,
      notes: this.notes

    });
  };

  addShipment(form: any): Promise<any> {
    this.shipment = {
      'bookingNumber': this.bookingNumber.value,
      'createDate': this.createDate.value,
      'deliveryDate': this.deliveryDate,
      'deliveryLocation': this.deliveryLocation.value,
      'retailer': this.retailer.value,
      'pickupDate': this.pickupDate.value,
      'pickupLocation': this.pickupLocation.value,
      'shipper': this.shipper.value,
      'notes': this.notes.value
    };

    this.myForm.setValue({
      'bookingNumber': null,
      'createDate': null,
      'deliveryDate': null,
      'deliveryLocation': null,
      'retailer': null,
      'pickupDate': null,
      'pickupLocation': null,
      'shipper': null,
      'notes': null

    });

    return this.BlockService.addShipment(this.shipment)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'productId': null,
        'producttype': null,
        'size': null,
        'description': null,
        'owner': null,
        'issuer': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }

}

 


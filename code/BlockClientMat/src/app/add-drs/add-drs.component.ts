import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShipmentOrder } from '../models/models';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-drs',
  templateUrl: './add-drs.component.html',
  styleUrls: ['./add-drs.component.css']
})
export class AddDRSComponent implements OnInit {
@Input()shipment:ShipmentOrder;
drsForm:FormGroup
@Output()onDrdAdd=new EventEmitter<ShipmentOrder>(null);

VehicleNumber = new FormControl('', Validators.required);
VehicleType = new FormControl('', Validators.required);
Driver = new FormControl('', Validators.required);
  constructor(fb: FormBuilder) {
    this.drsForm = fb.group({
      VehicleNumber: this.VehicleNumber,
      VehicleType: this.VehicleType,
      Driver: this.Driver,
    });
  }
  
  ngOnInit() {
   
  }
  AddDRS(){
    this.onDrdAdd.emit(this.shipment);
  }
}

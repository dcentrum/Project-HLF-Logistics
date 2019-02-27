import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockService } from '../../block.service'
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-drs',
  templateUrl: './drs.component.html',
  styleUrls: ['./drs.component.css']
})
export class DrsComponent implements OnInit {


  myForm: FormGroup;
  private drs;
  private shipment;
 
  driver = new FormControl('', Validators.required);
  vehicleName = new FormControl('', Validators.required);
  vehicleNumber = new FormControl('', Validators.required);
  errorMessage: any;

  constructor(private BlockService: BlockService, fb: FormBuilder) {
    this.myForm = fb.group({
      driver: this.driver,
      vehicleName: this.vehicleName,
      vehicleNumber: this.vehicleNumber,
    });
  };

  addDriver(form: any): Promise<any> {
    this.drs = {
      'driver': this.driver.value,
      'vehicleName': this.vehicleName.value,
      'vehicleNumber': this.vehicleNumber,
    };

    this.myForm.setValue({
      'driver': null,
      'vehicleName': null,
      'vehicleNumber': null,
      

    });

    return this.BlockService.addDriver(this.shipment)
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
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}

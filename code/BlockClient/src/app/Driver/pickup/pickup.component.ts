import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockService } from '../../block.service'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css']
})
export class PickupComponent implements OnInit {

  myForm: FormGroup;
    
  bookingNumber = new FormControl('',Validators.required);
  notes = new FormControl('', Validators.required);
  driverSignature = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  manufacturerSignature = new FormControl('', Validators.required);
  errorMessage: any;
  delivery: { 'notes': any; 'driverSignature': any; 'date': any; 'manufacturerSignature': any; };

  constructor(private BlockService: BlockService, fb: FormBuilder) {
    this.myForm = fb.group({
      notes: this.notes,
      driverSignature: this.driverSignature,
      date: this.date,
      retailSignature: this.manufacturerSignature
    });
  };

  getPickup(form: any): Promise<any> {
    this.delivery = {
      'notes': this.notes.value,
      'driverSignature': this.driverSignature.value,
      'date': this.date,
      'manufacturerSignature': this.manufacturerSignature
    };

    this.myForm.setValue({
      'notes': null,
      'driverSignature': null,
      'date': null,
      'manufacturerSignature': null
      

    });

    return this.BlockService.getPickup(this.bookingNumber)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'notes': null,
        'driverSignature': null,
        'date': null,
        'manufacturerSignature': null
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

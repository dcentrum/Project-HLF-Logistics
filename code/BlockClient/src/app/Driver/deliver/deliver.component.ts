import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BlockService } from '../../block.service'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.component.html',
  styleUrls: ['./deliver.component.css']
})
export class DeliverComponent implements OnInit {

  myForm: FormGroup;
    
  bookingNumber = new FormControl('',Validators.required);
  notes = new FormControl('', Validators.required);
  driverSignature = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  retailSignature = new FormControl('', Validators.required);
  errorMessage: any;
  delivery: { 'notes': any; 'driverSignature': any; 'date': any; 'retailSignature': any; };

  constructor(private BlockService: BlockService, fb: FormBuilder) {
    this.myForm = fb.group({
      notes: this.notes,
      driverSignature: this.driverSignature,
      date: this.date,
      retailSignature: this.retailSignature
    });
  };

  putDelivery(form: any): Promise<any> {
    this.delivery = {
      'notes': this.notes.value,
      'driverSignature': this.driverSignature.value,
      'date': this.date,
      'retailSignature': this.retailSignature
    };

    this.myForm.setValue({
      'notes': null,
      'driverSignature': null,
      'date': null,
      'retailSignature': null
      

    });

    return this.BlockService.putDelivery(this.bookingNumber)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'notes': null,
        'driverSignature': null,
        'date': null,
        'retailSignature': null
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

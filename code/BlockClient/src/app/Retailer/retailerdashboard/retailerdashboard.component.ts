import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {BlockService} from '../../block.service';

@Component({
  selector: 'app-retailerdashboard',
  templateUrl: './retailerdashboard.component.html',
  styleUrls: ['./retailerdashboard.component.css']
})
export class RetailerdashboardComponent implements OnInit {
 
  myForm: FormGroup;
  
    private id: any;
    private errorMessage: string;
  
    email = new FormControl('', Validators.required);
    firstName = new FormControl('', Validators.required);
    lastName = new FormControl('', Validators.required);
    type = new FormControl('', Validators.required);
    retailer: { 'email': any; 'firstName': any; 'lastName': any; 'type': any; };
    allRetailers: any[];
  
  
    constructor(private BlockService: BlockService, fb: FormBuilder) {
      this.myForm = fb.group({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        type: this.type
      });
    };
  
    ngOnInit(): void {
      this.loadAll();
    }
  
    loadAll(): Promise<any> {
      const tempList = [];
      return this.BlockService.getAllRetailers()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(participant => {
          tempList.push(participant);
        });
        this.allRetailers = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
          this.errorMessage = error;
        }
      });
    }
  
    /**
     * Event handler for changing the checked state of a checkbox (handles array enumeration values)
     * @param {String} name - the name of the participant field to update
     * @param {any} value - the enumeration value for which to toggle the checked state
     */
    changeArrayValue(name: string, value: any): void {
      const index = this[name].value.indexOf(value);
      if (index === -1) {
        this[name].value.push(value);
      } else {
        this[name].value.splice(index, 1);
      }
    }
  
    /**
     * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
     * only). This is used for checkboxes in the participant updateDialog.
     * @param {String} name - the name of the participant field to check
     * @param {any} value - the enumeration value to check for
     * @return {Boolean} whether the specified participant field contains the provided value
     */
    hasArrayValue(name: string, value: any): boolean {
      return this[name].value.indexOf(value) !== -1;
    }
  
    addRetailer(form: any): Promise<any> {
      this.retailer = {
        'email': this.email.value,
        'firstName': this.firstName.value,
        'lastName': this.lastName.value,
        'type': this.type.value
      };
  
      this.myForm.setValue({
        'email': null,
        'firstName': null,
        'lastName': null,
        'type': null
      });
  
      return this.BlockService.addRetailer(this.retailer)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          'email': null,
          'firstName': null,
          'lastName': null,
          'type': null
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
  
  
     updateRetailer(form: any): Promise<any> {
      this.retailer = {
        'email': this.email.value,
        'firstName': this.firstName.value,
        'lastName': this.lastName.value,
        'type': this.type.value
      };
  
      return this.BlockService.updateRetailer(this.retailer)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
    }
  
  
    deleteRetailer(): Promise<any> {
  
      return this.BlockService.deleteRetailer(this.id)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
    }
  
    setId(id: any): void {
      this.id = id;
    }
  
    getForm(id: any): Promise<any> {
  
      return this.BlockService.getRetailer(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'email': null,
          'firstName': null,
          'lastName': null,
          'type': null
        };
  
        if (result.email) {
          formObject.email = result.email;
        } else {
          formObject.email = null;
        }
  
        if (result.firstName) {
          formObject.firstName = result.firstName;
        } else {
          formObject.firstName = null;
        }
  
        if (result.lastName) {
          formObject.lastName = result.lastName;
        } else {
          formObject.lastName = null;
        }
  
        if (result.type) {
          formObject.type = result.type;
        } else {
          formObject.type = null;
        }
  
        this.myForm.setValue(formObject);
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  
    }
  
    resetForm(): void {
      this.myForm.setValue({
        'id': null,
        'email': null,
        'firstName': null,
        'lastName': null,
        'type': null
      });
    }
  }

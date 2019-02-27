import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BlockService } from '../../block.service';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-shipmentbooking',
    templateUrl: './shipmentbooking.component.html',
    styleUrls: ['./shipmentbooking.component.css']
  })
export class PackageComponent implements OnInit {

  myForm: FormGroup;
  
  RWBNumber = new FormControl('', Validators.required);
  hsnNumber = new FormControl('', Validators.required);
  productName = new FormControl('', Validators.required);
  productType = new FormControl('', Validators.required);
  productQty = new FormControl('', Validators.required);
  size = new FormControl('', Validators.required);
  package: { 'RWBNumber': any; 'hsnNumber': any; 'productQty': any; 'productName': any; 'productType': any; 'size': any; };
  allPackages: any[];
  errorMessage: any;

  constructor(private BlockService: BlockService, fb: FormBuilder) {
    this.myForm = fb.group({
      RWBNumber: this.RWBNumber,
      hsnNumber: this.hsnNumber,
      size: this.size,
      productName: this.productName,
      productType: this.productType,
      productQty: this.productQty
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.BlockService.getAllPackages()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allPackages = tempList;
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addPackage(form: any): Promise<any> {
    this.package = {      
      'RWBNumber': this.RWBNumber.value,
      'hsnNumber': this.hsnNumber.value,
      'size': this.size.value,
      'productName': this.productName.value,
      'productType': this.productType.value,
      'productQty': this.productQty.value
    };

    this.myForm.setValue({
      'RWBNumber': null,
      'hsnNumber': null,
      'size': null,
      'productName': null,
      'productType': null,
      'productQty': null
    });

    return this.BlockService.addPackage(this.package)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'RWBNumber': null,
        'hsnNumber': null,
        'size': null,
        'productName': null,
        'productType': null,
        'productQty': null
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


  updatePackage(form: any): Promise<any> {
    this.package = {      
        'RWBNumber': this.RWBNumber.value,
        'hsnNumber': this.hsnNumber.value,
        'size': this.size.value,
        'productName': this.productName.value,
        'productType': this.productType.value,
        'productQty': this.productQty.
    };

    return this.BlockService.updatePackage(this.package)
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


  deletePackage(): Promise<any> {

    return this.BlockService.deletePackage(this.RWBNumber)
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
    this.package = this.RWBNumber;
  }

  getForm(id: any): Promise<any> {

    return this.BlockService.getPackage(RWBNumber)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'RWBNumber': null,
        'hsnNumber': null,
        'size': null,
        'productName': null,
        'productType': null,
        'productQty': null
      };

      if (result.RWBNumber) {
        formObject.RWBNumber = result.RWBNumber;
      } else {
        formObject.RWBNumber = null;
      }

      if (result.hsnNumber) {
        formObject.hsnNumber = result.producttype;
      } else {
        formObject.hsnNumber = null;
      }

      if (result.size) {
        formObject.size = result.size;
      } else {
        formObject.size = null;
      }

      if (result.productName) {
        formObject.productName = result.productName;
      } else {
        formObject.productName = null;
      }

      if (result.productType) {
        formObject.productType = result.productType;
      } else {
        formObject.productType = null;
      }

      if (result.productQty) {
        formObject.productQty = result.productQty;
      } else {
        formObject.productQty = null;
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
        'RWBNumber': null,
        'hsnNumber': null,
        'size': null,
        'productName': null,
        'productType': null,
        'productQty': null
      });
  }

}

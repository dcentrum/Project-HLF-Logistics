import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ShipmentPackage } from '../models/models';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent implements OnInit {
  newpackage: ShipmentPackage = new ShipmentPackage();
  @Output() onAddPackage = new EventEmitter<ShipmentPackage>(null);
  packageForm: FormGroup
  RWBNumber = new FormControl('', Validators.required);
  HsnNumber = new FormControl('', Validators.required);
  ProductName = new FormControl('', Validators.required);
  ProductQty = new FormControl('', Validators.required);
  constructor(fb: FormBuilder) {
    this.packageForm = fb.group({
      RWBNumber: this.RWBNumber,
      HsnNumber: this.HsnNumber,
      ProductName: this.ProductName,
      ProductQty: this.ProductQty
    });
  }

  AddPackage() {
    this.onAddPackage.emit(this.newpackage);
  }
  ngOnInit() {
  }

}


import { Component, OnInit, Input } from '@angular/core';
import { ShipmentPackage } from '../models/models';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
@Input()packages:ShipmentPackage[]=[]

  constructor() { }

  ngOnInit() {
  }

}

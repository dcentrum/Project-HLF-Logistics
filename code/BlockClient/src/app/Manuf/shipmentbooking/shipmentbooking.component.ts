import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BlockService } from '../../block.service'
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-shipmentbooking',
  templateUrl: './shipmentbooking.component.html',
  styleUrls: ['./shipmentbooking.component.css']
})
export class ShipmentbookingComponent {

  @Input() shipmentfromlist: any;
    shipmentcount:number=0;
    tx_id:string;
    shipment = { isnew: true, bookingNumber: '', createdDate: '', shipper: '', retailer: '', pickUpDate: '', pickUpLocation: '' , deliveryDate: '', deliveryLocation:''  };
    formTitle = "New Shipment";
    @Output() saveShipment: EventEmitter<any> = new EventEmitter();
  
    bookingForm = this.fb.group({
      bookingNumber: [null, Validators.required],
      createdDate: [null, Validators.required],
      shipper: [null, Validators.required],
      retailer: [null, Validators.required],
      pickUpDate: [null, Validators.required],
      pickUpLocation: [null, Validators.required],
      deliveryDate: [null, Validators.required],
      deliveryLocation: [null, Validators.required],
    });
  shipmentForm: any;
    constructor(private fb: FormBuilder, private service: BlockService,public dialog: MatDialog) { 
      this.service.AssetCount.subscribe(count=>{
        this.shipmentcount=count;
      })
    }
    ngOnChanges(changes: SimpleChanges) {
      if (changes['shipmentfromlist']) {
        this.shipment.isnew = false;
        this.shipment.bookingNumber = this.shipmentfromlist.key;
        this.shipment.createdDate = this.shipmentfromlist.owner;
        this.shipment.shipper = this.shipmentfromlist.make;
        this.shipment.retailer = this.shipmentfromlist.model;
        this.shipment.pickUpDate = this.shipmentfromlist.colour;
        this.shipment.pickUpLocation = this.shipmentfromlist.pickUpLocation;
        this.shipment.deliveryDate = this.shipmentfromlist.deliveryDate;
        this.shipment.deliveryLocation = this.shipmentfromlist.deliveryLocation;
        
  
        this.formTitle = "Shipment Detail";
      }
      else
        this.formTitle = "New Shipment";
    }
    
    info() {
      this.service.ShipmentInfo(this.shipment.bookingNumber).subscribe((res:string) => {
        this.openDialog(JSON.parse(res));
      });
    }
  openDialog(arg0: any): any {
    throw new Error("Method not implemented.");
  }
    onSubmit(e) {
      if (this.shipmentForm.valid) {
        this.service.updateShipment(this.shipment).subscribe(res => {
          this.tx_id=res.result2.tx_id;
          this.service.updatedLastTransId(this.tx_id)
          this.saveShipment.emit({ Shipment: this.shipment });
        });
      }
    }

}
  


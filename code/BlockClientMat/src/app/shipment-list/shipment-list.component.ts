import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block.service';
import { ShipmentOrder, ShipmentPackage, ShipmentStatus } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  list: ShipmentOrder[] = [];
  party=""
  shipment:ShipmentOrder=new ShipmentOrder();
  shipmentLoaded=false;
  constructor(private blockService: BlockService,private router:Router) {
    this.blockService.Party.subscribe(p=>{
      this.party=p;
    })
    this.blockService.updatedTitle("Shipment List")
    this.loadShipments()
    
  }
numToShippingStatus(num)
{
  return ShipmentStatus[num]
}
  ngOnInit() {
  }
  editShipment(item)
  {
    this.shipmentLoaded=true;

    this.shipment=item;
  }
  ConfirmPickup(item)
  {
    this.blockService.ConfirmPickup(item).subscribe(res=>{

    });
  }
  ConfirmDeliver(item)
  {
    this.blockService.ConfirmDeliver(item).subscribe(res=>{

    });
  }
  packageAdded(e)
  {
    if(this.shipment.Packages==null)
    this.shipment.Packages=[];
   
    this.blockService.addPackage(this.shipment.BookingNumber,e).subscribe(ee=>{
      
    });
    this.shipment.Packages.push(e);
  }
  ShipmentDetail(row){
    this.router.navigateByUrl("newshipment",)
  }
  addShipment(){
    this.router.navigateByUrl("newshipment")
  }
  onDrdAdd(shipment){
    this.blockService.addDriver(shipment).subscribe(res=>{
      this.shipment = shipment;
    })
    
  }
  loadShipments()
  {
    this.blockService.getShipments().subscribe((data) => {
      let da = JSON.parse(data);
      da.forEach(d => {
        this.list.push({
          BookingNumber: d.BookingNumber,
          BookingDate: d.BookingDate, Shipper: d.Shipper, Retailer: d.Retailer, Manufacturer: d.Manufacturer,
          PickupDate: d.PickupDate, PickupLocation: d.PickupLocation, DeliveryDate: d.DeliveryDate,
          DeliveryLocation: d.DeliveryLocation, Notes: d.Notes,
          ManfSign: { Sig: d.ManfSign.Sig, SigDate: d.ManfSign.SigDate, Lat: d.ManfSign.Lat, Lang: d.ManfSign.Lang, Notes: d.ManfSign.Notes },
          RetailerSign: { Sig: d.RetailerSign.Sig, SigDate: d.RetailerSign.SigDate, Lat: d.RetailerSign.Lat, Lang: d.RetailerSign.Lang, Notes: d.RetailerSign.Notes },
          DriverManfSign: { Sig: d.DriverManfSign.Sig, SigDate: d.DriverManfSign.SigDate, Lat: d.DriverManfSign.Lat, Lang: d.DriverManfSign.Lang, Notes: d.DriverManfSign.Notes },
          DriverRetailerSign: { Sig: d.DriverRetailerSign.Sig, SigDate: d.DriverRetailerSign.SigDate, Lat: d.DriverRetailerSign.Lat, Lang: d.DriverRetailerSign.Lang, Notes: d.DriverRetailerSign.Notes },
          Driver: d.Driver, VehicleType: d.VehicleType, VehicleNumber: d.VehicleNumber, Status: d.Status,
          StatusDate: d.StatusDate, Packages: d.Packages
        })
      });
      
    })
  }
}

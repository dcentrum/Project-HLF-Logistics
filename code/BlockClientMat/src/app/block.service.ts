import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ShipmentOrder, ShipmentPackage } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private dsBlockHeight = new BehaviorSubject<number>(0);
  BlockHeight = this.dsBlockHeight.asObservable();

  private dsAssetCount = new BehaviorSubject<number>(0);
  AssetCount = this.dsAssetCount.asObservable();

  private dsLastTransId = new BehaviorSubject<string>('');
  LastTransId = this.dsLastTransId.asObservable();

  private dsTitle = new BehaviorSubject<string>("Block Client");
  Title = this.dsTitle.asObservable();

  private dsParty = new BehaviorSubject<string>("manuf");
  Party = this.dsParty.asObservable();
  appUrl: string = " http://localhost:8080/api/";
  Payload: any;
  constructor(private http: HttpClient) {
  }

  updatedBlockHeight(data: number) {
    this.dsBlockHeight.next(data);
  }
  updatedAssetCount(data: number) {
    this.dsAssetCount.next(data);
  }
  updatedLastTransId(data: string) {
    this.dsLastTransId.next(data);
    this.getBlockchainInfo().subscribe((res: any) => {
      this.updatedBlockHeight(res.height.low)
    });
  }
  updatedTitle(data: string) {
    this.dsTitle.next(data);
  }
  updatedParty(data: string) {
    this.dsParty.next(data);
  }
  getShippers(code: string) {
    return this.http.get<any>(this.appUrl + 'shippers')
      .pipe();
  }
  getManufacturers(code: string) {
    return this.http.get<any>(this.appUrl + 'manufacturers')
      .pipe();
  }
  getRetailers(code: string) {
    return this.http.get<any>(this.appUrl + 'retailers')
      .pipe();
  }
  getDrivers(code: string) {
    return this.http.get<any>(this.appUrl + 'drivers')
      .pipe();
  }
  ConfirmPickup(item: ShipmentOrder) {
    return this.http.post<any>(this.appUrl + 'shipment/' + item.BookingNumber + "/pickup",
      {
        partySign: "Manuf Sign",
        partySigDate: "2019-02-03",
        DriverSig: "driver Sign",
        driverSigDate: "2019-02-03",
        lat: "28.7041",
        lng: "77.1025",
        notes: "Pickup"
      }).pipe();
  }
  ConfirmDeliver(item: ShipmentOrder) {
    return this.http.post<any>(this.appUrl + 'shipment/' + item.BookingNumber + "/deliver",
      {
        partySign: "Retailer Sign",
        partySigDate: "2019-02-03",
        DriverSig: "driver Sign",
        driverSigDate: "2019-02-03",
        lat: "28.7041",
        lng: "77.1025",
        notes: "Delivered"
      }).pipe();
  }
  addShipment(shipmentorder: ShipmentOrder) {
    return this.http.post<any>(this.appUrl + 'shipment', shipmentorder)//,{headers:this.createuserheaders()}
      .pipe();
  }

  getShipments() {
    return this.http.get<any>(this.appUrl + 'shipments')
      .pipe();
  }
  getShipment(shipmentid) {
    return this.http.get<any>(this.appUrl + 'shipment/' + shipmentid)
      .pipe();
  }

  updateShipper(shipper: any) {
    return this.http.post<any>(this.appUrl + 'shipper', shipper)
      .pipe();
  }
  deleteShipper(code: string) {
    return this.http.delete(this.appUrl + 'shipper?shipperid=' + code)
      .pipe();
  }
  shipperInfo(code: string) {
    return this.http.get(this.appUrl + 'Shippers/history?shipperid=' + code)
      .pipe();
  }
  getShipperList() {
    return this.http.get<any>(this.appUrl + 'shippers')
      .pipe();
  }

  /*Manufacturer Information*/

  getOrder(order: string) {
    return this.http.get<any>(this.appUrl + 'orders?orderid=' + order)
      .pipe();
  }
  addManufacturer(code: any) {
    return this.http.post<any>(this.appUrl + 'manufacturers?manufacturerid=', code)
      .pipe();
  }
  updateManufacturer(manufacturer: any) {
    return this.http.post<any>(this.appUrl + 'manufacturer', manufacturer)
      .pipe();
  }
  deleteManufacturer(code: string) {
    return this.http.delete(this.appUrl + 'manufacturers?manufacturerid=' + code)
      .pipe();
  }
  manufacturerInfo(code: string) {
    return this.http.get(this.appUrl + 'manufacturers/history?manufacturerid=' + code)
      .pipe();
  }
  getAllManufacturers() {
    return this.http.get<any>(this.appUrl + 'manufacturers')
      .pipe();
  }

  /*Driver Information*/

  getDriver(code: string) {
    return this.http.get<any>(this.appUrl + 'driver?driverid=' + code)
      .pipe();
  }
  addDriver(shipment: any) {
    return this.http.post<any>(this.appUrl + 'shipment/' + shipment.BookingNumber + "/drs", { VehicleNumber: shipment.VehicleNumber, VehicleType: shipment.VehicleType, Driver: shipment.Driver, Status: "1" })
      .pipe();
  }
  updateDriver(driver: any) {
    return this.http.post<any>(this.appUrl + 'driver', driver)
      .pipe();
  }
  deleteDriver(code: string) {
    return this.http.delete(this.appUrl + 'driver?driverid=' + code)
      .pipe();
  }
  driverInfo(code: string) {
    return this.http.get(this.appUrl + 'drivers/history?driverid=' + code)
      .pipe();
  }


  updateShipment(shipment: any) {
    return this.http.post<any>(this.appUrl + 'shipment', shipment)
      .pipe();
  }
  deleteShipment(bookingNumber: any) {
    return this.http.delete(this.appUrl + 'shipment?shipmentid=' + bookingNumber)
      .pipe();
  }
  ShipmentInfo(bookingNumber: any) {
    return this.http.get(this.appUrl + 'shipments/history?shipmentid=' + bookingNumber)
      .pipe();
  }
  getShipmentList() {
    return this.http.get<any>(this.appUrl + 'shipments')
      .pipe();
  }


  /*Pakcage Information*/

  getPackage(RWBNumber: string) {
    return this.http.get<any>(this.appUrl + 'RWBNumber?RWBNumber=' + RWBNumber)
      .pipe();
  }
  addPackage(bookingNumber: number, package1: ShipmentPackage) {
    return this.http.post<any>(this.appUrl + 'shipment/' + bookingNumber + '/package', package1)
      .pipe();
  }
  updatePackage(RWBNumber: any) {
    return this.http.post<any>(this.appUrl + 'package', RWBNumber)
      .pipe();
  }
  deletePackage(RWBNumber: string) {
    return this.http.delete(this.appUrl + 'package?packageid=' + RWBNumber)
      .pipe();
  }
  PackageInfo(RWBNumber: string) {
    return this.http.get(this.appUrl + 'packgess/history?packgesid=' + RWBNumber)
      .pipe();
  }
  getAllPackages() {
    return this.http.get<any>(this.appUrl + 'packges')
      .pipe();
  }




  /* Retailer Information*/
  getAllRetailers() {
    return this.http.get<any>(this.appUrl + 'retailers')
      .pipe();
  }
  getRetailer(id: string) {
    return this.http.get<any>(this.appUrl + 'retailer?retailers=' + id)
      .pipe();
  }
  createRetailer(retailer: any) {
    return this.http.post<any>(this.appUrl + 'retailer', retailer)
      .pipe();
  }
  updateRetailer(email: any) {
    return this.http.post<any>(this.appUrl + 'retailer', email)
      .pipe();
  }
  deleteRetailer(id: string) {
    return this.http.delete(this.appUrl + 'retailer?retailers=' + id)
      .pipe();
  }
  addRetailer(retailer: { 'email': any; 'firstName': any; 'lastName': any; 'type': any; }): any {
    throw new Error("Method not implemented.");
  }

  /*Delivery and Pickup Info*/
  putDelivery(bookingNumber: any) {
    return this.http.get<any>(this.appUrl + 'bookingNumber', bookingNumber)
      .pipe();
  }
  getPickup(bookingNumber: any) {
    return this.http.get<any>(this.appUrl + 'bookingNumber', bookingNumber)
      .pipe();
  }

  getBlockchainInfo() {
    return this.http.get(this.appUrl + 'blockchain')
      .pipe();
  }
  createuserheaders() {
    return new HttpHeaders().set('username', 'mfg1user');
  }
}

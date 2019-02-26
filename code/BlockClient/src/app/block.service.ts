import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface BlockchainInfo {
  height: number;
  currentBlockHash: string;
  previousBlockHash: string;
}
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

  /*Logistics Information*/

  getOrderList() {
    return this.http.get<any>(this.appUrl + 'orders')
      .pipe();
  }
  getShipper(code: string) {
    return this.http.get<any>(this.appUrl + 'shipper?shipperid=' + code)
      .pipe();
  }
  createOrder(order: any) {
    return this.http.post<any>(this.appUrl + 'order', order)
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
  getAllManufacturers(){
    return this.http.get<any>(this.appUrl + 'manufacturers')
    .pipe();
  }

  /*Driver Information*/

  getDriver(code: string) {
    return this.http.get<any>(this.appUrl + 'driver?driverid=' + code)
      .pipe();
  }
  createDriver(driver: any) {
    return this.http.post<any>(this.appUrl + 'driver', driver)
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
  
  /*Shipment Information*/

  getShipment(bookingNumber: string) {
    return this.http.get<any>(this.appUrl + 'shipment?shipmentid=' + bookingNumber)
      .pipe();
  }
  createShipment(bookingNumber: any) {
    return this.http.post<any>(this.appUrl + 'order', bookingNumber)
      .pipe();
  }
  updateShipment(shipment: any) {
    return this.http.post<any>(this.appUrl + 'shipment', shipment)
      .pipe();
  }
  deleteShipment(bookingNumber: string) {
    return this.http.delete(this.appUrl + 'shipment?shipmentid=' + bookingNumber)
      .pipe();
  }
  ShipmentInfo(bookingNumber: string) {
    return this.http.get(this.appUrl + 'shipments/history?shipmentid=' + bookingNumber)
      .pipe();
  }
  getShipmentList() {
    return this.http.get<any>(this.appUrl + 'shipments')
      .pipe();
  }

   /* Retailer Information*/
  getAllRetailers(){
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
  getBlockchainInfo() {
    return this.http.get(this.appUrl + 'blockchain')
      .pipe();
  }
  createTokenheaders() {
    return new HttpHeaders().set('authorization', 'Bearer ' + this.Payload.Login.output.token).set("content-type", "application/json");
  }

}
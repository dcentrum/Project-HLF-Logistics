import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentbookingComponent } from './Manuf/shipmentbooking/shipmentbooking.component';
import { PickupComponent } from './Driver/pickup/pickup.component';
import { DeliverComponent } from './Driver/deliver/deliver.component';
import { ShipmentdetailComponent } from './Shipper/shipmentdetail/shipmentdetail.component';
import { DrsComponent } from './Shipper/drs/drs.component';
import { ShipmentsComponent } from './Shipper/shipments/shipments.component';
import { ShipmenttrackComponent } from './Shipper/shipmenttrack/shipmenttrack.component';
import { ManufdashboardComponent } from './Manuf/manufdashboard/manufdashboard.component';
import { RetailerdashboardComponent } from './Retailer/retailerdashboard/retailerdashboard.component';

const routes: Routes = [
  { path: "", component: ShipmentbookingComponent },
  { path: "dashboard", component: ShipmentsComponent },
  { path: "manfdashboard", component: ManufdashboardComponent },
  { path: "retailerdashboard", component: RetailerdashboardComponent },
  { path: "shipmentbook", component: ShipmentbookingComponent },
  { path: "shipmentdetail", component: ShipmentdetailComponent },
  { path: "drs", component: DrsComponent },
  { path: "pickup", component: PickupComponent },
  { path: "deliver", component: DeliverComponent },
  { path: "shipments", component: ShipmentsComponent },
  { path: "track", component: ShipmenttrackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

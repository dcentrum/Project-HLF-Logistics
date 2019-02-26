import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipmentbookingComponent } from './Manuf/shipmentbooking/shipmentbooking.component';
import { ShipmenttrackComponent } from './Shipper/shipmenttrack/shipmenttrack.component';
import { DashboardComponent } from './Shipper/dashboard/dashboard.component';
import { ShipmentdetailComponent } from './Shipper/shipmentdetail/shipmentdetail.component';
import { DrsComponent } from './Shipper/drs/drs.component';
import { PickupComponent } from './Driver/pickup/pickup.component';
import { DeliverComponent } from './Driver/deliver/deliver.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ShipmentsComponent } from './Shipper/shipments/shipments.component';
import { ManufdashboardComponent } from './Manuf/manufdashboard/manufdashboard.component';
import { BlockService } from './block.service';
import { RetailerdashboardComponent } from './Retailer/retailerdashboard/retailerdashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ShipmentbookingComponent,
    ShipmenttrackComponent,
    DashboardComponent,
    ShipmentdetailComponent,
    DrsComponent,
    PickupComponent,
    DeliverComponent,
    ShipmentsComponent,
    ManufdashboardComponent,
    RetailerdashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DatePickerModule
  ],
  providers: [BlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }

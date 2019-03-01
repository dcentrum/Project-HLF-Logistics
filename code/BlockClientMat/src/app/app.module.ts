import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatDialogModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ChaindashboardComponent } from './chaindashboard/chaindashboard.component';
import { NewShipmentComponent } from './new-shipment/new-shipment.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { PackageListComponent } from './package-list/package-list.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { ShipmentMainComponent } from './shipment-main/shipment-main.component';
import { BlockService } from './block.service';
import { AddDRSComponent } from './add-drs/add-drs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ChaindashboardComponent,
    NewShipmentComponent,
    ShipmentListComponent,
    PackageListComponent,
    NewPackageComponent,
    ShipmentDetailComponent,
    PackageDetailComponent,
    ShipmentMainComponent,
    AddDRSComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,MatDialogModule,
    MatInputModule,    FlexLayoutModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,HttpClientModule, MatGridListModule, MatMenuModule
  ],
  entryComponents: [
    
  ],
  providers: [BlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }

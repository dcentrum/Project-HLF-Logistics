import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentMainComponent } from './shipment-main/shipment-main.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { NewShipmentComponent } from './new-shipment/new-shipment.component';
import { NewPackageComponent } from './new-package/new-package.component';
import { PackageListComponent } from './package-list/package-list.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';

const routes: Routes = [
  {path:'',component:NewShipmentComponent},
  {path:'newshipment',component:NewShipmentComponent},
  {path:'shipmentdetail',component:ShipmentDetailComponent},
  {path:'shipmentlist',component:ShipmentListComponent},
  {path:'newpackage',component:NewPackageComponent},
  {path:'packagelist',component:PackageListComponent},
  {path:'packagedetail',component:PackageDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

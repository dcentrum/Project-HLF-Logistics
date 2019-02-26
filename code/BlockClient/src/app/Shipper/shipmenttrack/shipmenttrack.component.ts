import { Component, OnInit, ViewChild, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ShipmentlistDataSource } from '../shipments/shipment.datasource';
import { BlockService } from '../../block.service';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipmenttrack.component.html',
  styleUrls: ['./shipmenttrack.component.css'],
  providers: [BlockService]
})
export class ShipmenttrackComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ShipmentlistDataSource;
  @Output() shipment = new EventEmitter();
  constructor(private service: BlockService) {
    this.loadShipments();
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['bookingNumber', 'manufacturer', 'retailer', 'status'];

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatelist'])
      this.loadShipments();
  }
  editShipment(shipment) {
    this.shipment.emit(shipment);
  }
 
  loadShipments() {
    this.service.getShipmentList().subscribe((res: string) => {
      let shipments = [];
      JSON.parse(res).forEach(element => {
        shipments.push({          
          bookingNumber: element.bookingNumber
          , manufacturer: element.Record.manufacturer
          , retailer: element.Record.retailer
          , status: element.Record.status
        });
      });
      this.dataSource = new ShipmentlistDataSource(this.paginator, this.sort, shipments);
      this.dataSource.connect()
    });
  }
}

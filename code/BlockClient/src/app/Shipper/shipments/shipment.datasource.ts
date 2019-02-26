import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface ShipmentlistItem {
  RWBNumber: string
  productName: string
  productType: string,
  status: string, 
}
export class ShipmentlistDataSource extends DataSource<ShipmentlistItem> {
  data: ShipmentlistItem[];

  constructor(private paginator: MatPaginator, private sort: MatSort, data: ShipmentlistItem[]) {
    super();
    this.data = data;
  }
  connect(): Observable<ShipmentlistItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  disconnect() { }

  private getPagedData(data: ShipmentlistItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ShipmentlistItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'RWBNumber': return compare(a.RWBNumber, b.RWBNumber, isAsc);
        case 'productName': return compare(a.productName, b.productName, isAsc);
        case 'productType': return compare(+a.productType, +b.productType, isAsc);        
        case 'status': return compare(+a.status, +b.status, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

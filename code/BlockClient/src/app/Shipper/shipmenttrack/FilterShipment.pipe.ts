import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterAsset'
})
export class FilterShipment implements PipeTransform
{
  transform(allAssets : any, AssetFind: any):any {

      if(AssetFind === undefined)
      {
          return allAssets;
      }
      else{
          return allAssets.filter(
              function(x)
              {
                  return x.shipmentId.includes(AssetFind);
              }
          )
      }

  }
}
export class signature {
    Sig: string
    SigDate: string
    Lat: number
    Lang: number
    Notes: string
}

export class ShipmentOrder {
    BookingNumber: number = 0
    BookingDate: string;
    Shipper: string="";
    Retailer: string=""
    Manufacturer: string=""

    PickupDate: string=""
    PickupLocation: string=""
    DeliveryDate: string=""
    DeliveryLocation: string=""
    Notes: string=""

    ManfSign: signature =new signature()
    RetailerSign: signature=new signature()
    DriverManfSign: signature=new signature()
    DriverRetailerSign: signature=new signature()

    Driver: string=""
    VehicleType: string=""
    VehicleNumber: string=""
    Status: number=0
    StatusDate: string

    Packages: ShipmentPackage[]
}

export class ShipmentPackage {
    RWBNumber: string=""
    HsnNumber: string=""
    ProductName: string=""
    ProductType: string=""
    ProductQty: number=0
    ProductSize: string=""
    Status: number=0
    StatusDate: string
}

export enum ShipmentStatus {
    ShipmentDeleted = 0,
    ShipmentOrderPlaced = 1,
    ShipmentAccepted = 2,
    ShipmentRejected = 3,
    DriverAssigned = 4,
    ShipmentPicked = 6,
    Intransit = 7,
    Delivered = 8,
    Verified = 10,
    Completed = 11
}
export enum packageStatus {
    PackageDeleted = 0,
    Created = 1,
    ShipperAccepted = 2,
    ShipperRejected = 3,
    DriverAccepted = 5,
    DriverRejected = 6,
    RetailerAccepted = 7,
    RetailerRejected = 8
}
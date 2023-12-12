export class Address {
  houseNo: number;
  apartmentName: string;
  streetDetails: string;
  landmark: string;
  areaDetails: string;
  city: string;
  addressLine: string;
  floor: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.houseNo = obj.houseNo;
    this.apartmentName = obj.apartmentName;
    this.streetDetails = obj.streetDetails;
    this.landmark = obj.landmark;
    this.areaDetails = obj.areaDetails;
    this.city = obj.city;
    this.addressLine = obj.addressLine;
    this.floor = obj.floor;
  }
}

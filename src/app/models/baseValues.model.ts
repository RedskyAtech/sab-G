export class BaseValues {
  singleUnitMarketPrice: string;
  singleUnitPrice: string;
  unit: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.singleUnitMarketPrice = obj.unitMarketPrice;
    this.singleUnitPrice = obj.price;
    this.unit = obj.unit;
  }
}

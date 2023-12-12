export class Dimensions {
  value: number;
  unit: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.value = obj.value;
    this.unit = obj.unit;
  }
}

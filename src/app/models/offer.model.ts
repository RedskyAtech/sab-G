export class Offer {
  heading: string;
  description: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.heading = obj.heading;
    this.description = obj.description;
  }
}

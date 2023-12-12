import { Product } from './product.model';

export class Cart {
  product: Product;
  _id: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.product = obj.product;
    this._id = obj._id;
  }
}

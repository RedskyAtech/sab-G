import { Category } from './category.model';
import { Images } from './images.model';
import { Offer } from './offer.model';
import { Dimensions } from './dimensions.model';
import { BaseValues } from './baseValues.model';
export class Product {
  name: string;
  image: Images;
  marketPrice: string;
  price: number;
  category: Category;
  _id: string;
  offer: Offer;
  quantity: number;
  dimensions: Dimensions;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this._id = obj._id;
    this.name = obj.name;
    this.image = obj.image;
    this.marketPrice = obj.marketPrice;
    this.price = obj.price;
    this.category = obj.category;
    this.offer = obj.offer;
    this.quantity = obj.quantity;
    this.dimensions = obj.dimensions;
  }
}

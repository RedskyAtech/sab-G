import { Images } from './images.model';
export class Category {
  name: string;
  image: Images;
  _id: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.name = obj.name;
    this.image = obj.image;
    this._id = obj._id;
  }
}

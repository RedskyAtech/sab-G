import { Images } from './images.model';
export class Slider {
  image: Images;
  _id: string;
  constructor(obj?: any) {
    if (!obj) {
      return;
    }
    this.image = obj.image;
    this._id = obj._id;
  }
}

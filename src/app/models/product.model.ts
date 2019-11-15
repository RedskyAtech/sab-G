import { Category } from './category.model';
import { Images } from './images.model';
import { Offer } from './offer.model';
export class Product {

    name: string;
    image: Images;
    marketPrice: string;
    price: string;
    category: Category;
    id: string;
    offer: Offer;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.id = obj.id;
        this.name = obj.name;
        this.image = obj.image;
        this.marketPrice = obj.marketPrice;
        this.price = obj.price;
        this.category = obj.category;
        this.offer = obj.offer;
    }
}
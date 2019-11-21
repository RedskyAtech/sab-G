import { Product } from './product.model';

export class Cart {
    product: Product;
    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.product = obj.product;
    }
}
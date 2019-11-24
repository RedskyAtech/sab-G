import { Cart } from './cart.model';
export class Order {
    _id: string;
    cart: Cart;
    constructor(obj?: any) {
        if (!obj) {
            return;
        }
        this.cart = obj.cart;
        this._id = obj._id;
    }
}
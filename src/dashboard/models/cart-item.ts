import {Adding} from "./adding";
import {CartItemProduct} from "./cart-item-product";

export class CartItem {
    id: number;
    count: number;
    sugar: number;
    adding: Adding;
    item: CartItemProduct;

    constructor(data: any) {
        this.id = data.id;
        this.count = data.count;
        this.sugar = data.sugar;
        this.adding = data.adding;
        this.item = CartItemProduct.transform(data.item);
    }

    static transform(data: any): CartItem {
        return new CartItem(data);
    }
}

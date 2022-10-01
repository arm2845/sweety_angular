import {MenuProduct} from "./menu-product";

export class CartItem {
    id: number;
    count: number;
    sugar: number;
    item: MenuProduct;
    adding_ids: number[];
    adding_price: number;
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.count = data.count;
        this.sugar = data.sugar;
        this.item = MenuProduct.transform(data.item);
        this.adding_ids = data.adding_ids;
        this.adding_price = data.adding_price;
        this.price = data.price;
    }

    static transform(data: any): CartItem {
        return new CartItem(data);
    }
}

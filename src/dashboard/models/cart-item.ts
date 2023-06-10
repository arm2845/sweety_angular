import {MenuProduct} from "./menu-product";

export class CartItem {
    id: number;
    count: number;
    sugar: number;
    can_order: boolean;
    item: MenuProduct;
    adding_ids: number[];
    mix_ids: number[];
    adding_price: number;
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.count = data.count;
        this.sugar = data.sugar;
        this.can_order = data.can_order;
        this.item = MenuProduct.transform(data.item);
        this.adding_ids = data.adding_ids;
        this.mix_ids = data.mix_ids;
        this.adding_price = data.adding_price;
        this.price = data.price;
    }

    static transform(data: any): CartItem {
        return new CartItem(data);
    }
}

import {MenuProduct} from "./menu-product";

export class Order {
    id: number;
    status: number;
    user_id: number;
    payment_type: number;
    count: number;
    discount: number;
    original_price: number;
    price: number;
    note: string
    items: MenuProduct[];

    constructor(data: any) {
        this.id = data.id;
        this.status = data.status;
        this.user_id = data.user_id;
        this.payment_type = data.payment_type;
        this.count = data.count;
        this.discount = data.discount;
        this.original_price = data.original_price;
        this.price = data.price;
        this.note = data.note;
        this.items = MenuProduct.transformCollection(data.items);
    }

    static transform(data: any): Order {
        return new Order(data);
    }
}

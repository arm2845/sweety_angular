import {MenuProduct} from "../../dashboard/models/menu-product";
import {Cart} from "./cart";

export class User {
    id: number;
    username: string;
    phone: string;
    role: string;
    cart: Cart;
    favourites: MenuProduct[];

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.phone = data.phone;
        this.role = data.role;
        this.cart = Cart.transform(data.cart);
        this.favourites = data.favourites;
    }
}

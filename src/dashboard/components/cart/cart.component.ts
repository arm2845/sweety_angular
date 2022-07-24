import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Product} from "../../models/product";
import {User} from "../../../auth/models/user";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products: Product[] = [];
    authUser: User | any;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.authUser = this.authService.authUser;
        this.products = this.authUser.cart.items || [];
    }

    deleteItemFromCart(product: Product) {
        let index = this.products.findIndex(item => item.id == product.id);
        this.products.splice(index, 1);
    }

}

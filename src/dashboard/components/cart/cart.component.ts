import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Product} from "../../models/product";
import {Subscription, tap} from "rxjs";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products: Product[] = [];

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.getCart();
    }

    getCart(): Subscription {
        return this.authService.getCart().pipe(
            tap((res: any) => {
                this.products = res.data.items;
            }),
        )
            .subscribe()
    }

    deleteItemFromCart(product: Product) {
        let index = this.products.findIndex(item => item.id == product.id);
        this.products.splice(index, 1);
    }

}

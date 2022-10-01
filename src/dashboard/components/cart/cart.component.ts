import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {finalize, Subscription, tap} from "rxjs";
import {CartItem} from "../../models/cart-item";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products: CartItem[] = [];
    isLoading = true;

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
                this.products = res.data;
            }),
            finalize(() => this.isLoading = false),
        )
            .subscribe()
    }

    deleteItemFromCart(product: CartItem) {
        let index = this.products.findIndex((item) => item.id == product.id);
        this.products.splice(index, 1);
    }

    confirmOrder(comment: string) {
        console.log(comment);
    }

}

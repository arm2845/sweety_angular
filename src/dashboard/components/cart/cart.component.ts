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
    cartIsEmpty: boolean;
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
                this.updateCartState();
            }),
            finalize(() => this.isLoading = false),
        )
            .subscribe()
    }

    deleteItemFromCart(product: CartItem) {
        let index = this.products.findIndex((item) => item.id == product.id);
        this.products.splice(index, 1);
        this.updateCartState();
    }

    confirmOrder(comment: string) {
        console.log(comment);
    }

    updateCartData(res: CartItem[]): void {
        this.products = res;
        this.updateCartState();
    }

    private updateCartState(): void {
        this.cartIsEmpty = !this.products.length;
    }

}

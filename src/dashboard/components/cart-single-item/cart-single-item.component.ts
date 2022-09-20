import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {Subscription, tap} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";

@Component({
    selector: 'app-cart-single-item',
    templateUrl: './cart-single-item.component.html',
    styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
    @Input() product: Product;
    @Output() itemDeleted = new EventEmitter;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {}

    removeFromCart(): Subscription {
        return this.authService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
                updateCartCount(false, this.product.count_in_cart);
            })
        )
            .subscribe();
    }

    increase(): void {
        const data = {
            count: this.product.count_in_cart + 1,
            increase: true,
        }
        this.changeCountInCart(data);
    }

    decrease(): void {
        const data = {
            count: this.product.count_in_cart - 1,
            increase: false,
        }
        this.changeCountInCart(data);
    }

    changeCountInCart(data: {count: number, increase: boolean}): Subscription {
        return this.authService.changeCountInCart(this.product.id, data).pipe(
            tap((res) => {
                this.product.count_in_cart = res.data.count_in_cart;
                updateCartCount(data.increase);
            }),
        )
            .subscribe();
    }

}

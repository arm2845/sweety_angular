import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product";
import {Subscription, tap} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";

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
            })
        )
            .subscribe();
    }

    changeFavoriteState() {
        if (this.product.is_favourite) {
            return this.authService.removeFromFavorites(this.product.id).pipe(
                tap(() => this.product.is_favourite = false),
            )
                .subscribe();
        } else {
            return this.authService.addToFavorites(this.product.id).pipe(
                tap(() => this.product.is_favourite = true),
            )
                .subscribe();
        }
    }

    increase(): void {
        const data = {
            count: this.product.count_in_cart + 1,
        }
        this.changeCountInCart(data);
    }

    decrease(): void {
        const data = {
            count: this.product.count_in_cart - 1,
        }
        this.changeCountInCart(data);
    }

    changeCountInCart(data: {count: number}): Subscription {
        return this.authService.changeCountInCart(this.product.id, data).pipe(
            tap((res) => this.product.count_in_cart = res.data.count_in_cart),
        )
            .subscribe();
    }

}

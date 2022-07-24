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
    @Input() product: Product | any;
    @Output() itemDeleted = new EventEmitter;
    isFavorite: boolean | undefined;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        if (this.authService.authUser) {
            if (this.authService.authUser?.favourites?.findIndex(item => item.id == this.product.id) != -1) {
                this.isFavorite = true;
            }
        }
    }

    removeFromCart(): Subscription {
        return this.authService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
            })
        )
            .subscribe();
    }

    changeFavoriteState() {
        if (this.isFavorite) {
            return this.authService.removeFromFavorites(this.product.id).pipe(
                tap(() => {
                    this.isFavorite = false;
                    let index = this.authService.authUser?.favourites.findIndex(item => item.id == this.product.id);
                    // @ts-ignore
                    this.authService.authUser?.favourites.splice(index, 1);
                }),
            )
                .subscribe();
        } else {
            return this.authService.addToFavorites(this.product.id).pipe(
                tap(() => {
                    this.isFavorite = true;
                    this.authService.authUser?.favourites.push(this.product);
                }),
            )
                .subscribe();
        }
    }

}

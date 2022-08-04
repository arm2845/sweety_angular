import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {Product} from "../../models/product";

@Component({
    selector: 'app-product-single',
    templateUrl: './product-single.component.html',
    styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
    @Input() product: Product;
    @Output() favoriteStateChanged = new EventEmitter();

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {}

    changeFavoriteState(): Subscription {
        if (this.product.is_favourite) {
            return this.authService.removeFromFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = false;
                    this.favoriteStateChanged?.emit(this.product);
                }),
            )
                .subscribe();
        } else {
            return this.authService.addToFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = true;
                    this.favoriteStateChanged?.emit(this.product);
                }),
            )
                .subscribe();
        }
    }

    addToCart(): Subscription {
        return this.authService.addToCart(this.product.id)
            .subscribe();
    }

}

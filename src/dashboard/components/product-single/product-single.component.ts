import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {MenuProduct} from "../../models/menu-product";
import {ProductSingleOptions} from "../../constants/product-single-options";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {MatDialog} from "@angular/material/dialog";
import {AddOnsComponent} from "../../../modals/components/add-ons/add-ons.component";
import {ProductAdditionalData} from "../../interfaces/product-additional-data";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-product-single',
    templateUrl: './product-single.component.html',
    styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
    @Input() product: MenuProduct;
    @Input() pageOption: number;
    @Output() removeFromFavorites = new EventEmitter();

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {}

    changeFavoriteState(): Subscription {
        if (this.product.is_favourite) {
            return this.authService.removeFromFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = false;
                    if (this.pageOption === ProductSingleOptions.favourites) {
                        this.removeFromFavorites?.emit(this.product);
                    }
                }),
            )
                .subscribe();
        } else {
            return this.authService.addToFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = true;
                }),
            )
                .subscribe();
        }
    }

    addToCart(data: ProductAdditionalData): Subscription {
        return this.cartService.addToCart(this.product.id, data).pipe(
            tap(() => updateCartCount(true, data.count)),
        )
            .subscribe();
    }

    openDialog(product: MenuProduct) {
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '400px',
            height: '420px',
            data: {
                product: product,
                confirm_button_name: 'Add to Cart',
            },
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.addToCart(result.data);
                }
            })
        )
            .subscribe();
    }

}

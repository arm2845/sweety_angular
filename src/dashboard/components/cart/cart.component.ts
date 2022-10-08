import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {finalize, Subscription, tap} from "rxjs";
import {CartItem} from "../../models/cart-item";
import {MatDialog} from "@angular/material/dialog";
import {OrderCheckoutComponent} from "../order-checkout/order-checkout.component";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    products: CartItem[] = [];
    cartIsEmpty: boolean;
    isLoading = true;
    total_price: number;

    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.getCart();
    }

    getCart(): Subscription {
        return this.authService.getCart().pipe(
            tap((res: any) => {
                this.products = res.data;
                this.total_price = res.meta.total_price;
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
        this.total_price -= product.count * product.price;
    }

    confirmOrder() {
        let dialogRef = this.dialog.open(OrderCheckoutComponent, {
            width: '350px',
            height: '506px',
            data: {
                total_price: this.total_price,
                total_count: Number(localStorage.getItem('cartCount')),
            }
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    console.log(result)
                }
            })
        )
            .subscribe();
    }

    updateCartData(res: any): void {
        this.products = res.data;
        this.total_price = res.meta.total_price;
        this.updateCartState();
    }

    private updateCartState(): void {
        this.cartIsEmpty = !this.products.length;
    }

}

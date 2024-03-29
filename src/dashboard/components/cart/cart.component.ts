import {Component, OnInit} from '@angular/core';
import {finalize, Subscription, tap} from "rxjs";
import {CartItem} from "../../models/cart-item";
import {MatDialog} from "@angular/material/dialog";
import {OrderCheckoutComponent} from "../../../modals/components/order-checkout/order-checkout.component";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderData} from "../../interfaces/order-data";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {TranslateService} from "@ngx-translate/core";

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

    readonly toolTip = 'TOOLTIPS.ORDER-PRICE';

    constructor(
        public dialog: MatDialog,
        private cartService: CartService,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
    ) {}

    ngOnInit(): void {
        this.getCart();
    }

    getCart(): Subscription {
        return this.cartService.getCart().pipe(
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

    startOrder(): void {
        this.products.some(product => !product.can_order) ? this.confirmOrder() : this.openOrderDialog();
    }

    private confirmOrder(): void {
        const message = this.translate.instant('MESSAGES.ORDER-INCLUDES-NOT-AVAILABLE-ITEMS');
        let dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '300px',
            height: 'auto',
            data: {
                message: message,
            }
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.openOrderDialog();
                }
            })
        )
            .subscribe();
    }

    private openOrderDialog(): void {
        let dialogRef = this.dialog.open(OrderCheckoutComponent, {
            maxWidth: '90vh',
            width: '300px',
            height: 'auto',
            data: {
                total_price: this.total_price,
                total_count: this.getCartAvailableProductsCount(),
            }
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.placeOrder(result);
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

    productsAreNotAvailable(): boolean {
        return this.products.every(product => !product.can_order);
    }

    private getCartAvailableProductsCount(): number {
        let unavailableProductsCount = 0;
        this.products.forEach(product => {
            if (!product.can_order) {
                unavailableProductsCount += product.count;
            }
        })
        return Number(localStorage.getItem('cartCount')) - unavailableProductsCount;
    }

    private updateCartState(): void {
        this.cartIsEmpty = !this.products.length;
    }

    private placeOrder(data: OrderData): Subscription {
        return this.orderService.placeOrder(data).pipe(
            tap(() => updateCartCount(false, Number(localStorage.getItem('cartCount')))),
            tap(() => this.router.navigateByUrl('dashboard/order')),
        )
            .subscribe();
    }

}

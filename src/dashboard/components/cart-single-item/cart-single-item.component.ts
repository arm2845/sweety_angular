import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {AddOnsComponent} from "../../../modals/components/add-ons/add-ons.component";
import {MatDialog} from "@angular/material/dialog";
import {CartItem} from "../../models/cart-item";
import {SugarOptionsData} from "../../constants/add-on-data";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {CartService} from "../../services/cart.service";
import {PopUpNotificationComponent} from "../../../modals/components/pop-up-notification/pop-up-notification.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {MenuProduct} from "../../models/menu-product";
import {getTranslatedProductName} from "../../../app/helpers/language.helper";
import {Adding} from "../../models/adding";

@Component({
    selector: 'app-cart-single-item',
    templateUrl: './cart-single-item.component.html',
    styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent {
    @Input() product: CartItem;
    @Output() itemDeleted = new EventEmitter;
    @Output() cartUpdated = new EventEmitter;
    sugarOption: string;
    addings: string;

    constructor(
        private cartService: CartService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
    ) {}

    getSugarOption(): string {
        return this.product.sugar ? this.translate.instant(
            SugarOptionsData.find(item => item.id === this.product.sugar).name) : '-';
    }

    getAddingName(id: number): string {
        const adding = this.product.item.addings.find(adding => adding.id === id);
        return this.getName(adding);
    }

    getMixName(id: number): string {
        const mix = this.product.item.mixes.find(mix => mix.id === id);
        return this.getName(mix);
    }

    getMixes(ids: number[]): string {
        const mixes: string[] = [];
        ids.forEach(id => mixes.push(this.getName(this.product.item.mixes.find(mix => mix.id === id))));
        return mixes.join(', ');
    }

    openAddOnModal(product: CartItem): void {
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '320px',
            height: 'auto',
            data: {
                product: product,
                confirm_button_name: 'BUTTONS.SAVE',
            },
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.updateCartItem(result);
                }
            })
        )
            .subscribe();
    }

    openConfirmationModal(): void {
        const message = this.translate.instant('MESSAGES.CONFIRM-DELETING');
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
                    this.removeFromCart();
                }
            })
        )
            .subscribe();
    }

    updateCartItem(requestData: any): Subscription {
        return this.cartService.updateCartItem(requestData.id, requestData.data).pipe(
            tap((res) => this.cartUpdated.emit(res)),
            tap((res) =>localStorage.setItem('cartCount', String(res.meta.total_count))),
            tap(() => this.showNotification(this.translate.instant('MESSAGES.UPDATED-SUCCESSFULLY'))),
        )
            .subscribe();
    }

    removeFromCart(): Subscription {
        return this.cartService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
                updateCartCount(false, this.product.count);
                this.showNotification(this.translate.instant('MESSAGES.DELETED-SUCCESSFULLY'));
            })
        )
            .subscribe();
    }

    showNotification(message: string) {
        this.snackBar.openFromComponent(PopUpNotificationComponent, {
            data: {
                message: message,
            },
            duration: 5000,
        });
    }

    getName(product: MenuProduct | Adding): string {
        return getTranslatedProductName(product);
    }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {AddOnsComponent} from "../../../modals/components/add-ons/add-ons.component";
import {MatDialog} from "@angular/material/dialog";
import {CartItem} from "../../models/cart-item";
import {SugarOptionsData} from "../../constants/add-on-data";
import {AddOnsHelper} from "../../../app/helpers/addOns.helper";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {CartService} from "../../services/cart.service";
import {PopUpNotificationComponent} from "../../../modals/components/pop-up-notification/pop-up-notification.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-cart-single-item',
    templateUrl: './cart-single-item.component.html',
    styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
    @Input() product: CartItem;
    @Output() itemDeleted = new EventEmitter;
    @Output() cartUpdated = new EventEmitter;
    sugarOption: string;
    addings: string;

    readonly message = this.translate.instant('MESSAGES.UPDATED-SUCCESSFULLY');
    readonly deleteMessage = this.translate.instant('MESSAGES.DELETED-SUCCESSFULLY');

    constructor(
        private cartService: CartService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private addOnHelper: AddOnsHelper,
    ) {
    }

    ngOnInit(): void {}

    getSugarOption(): string {
        return this.translate.instant(SugarOptionsData.find(item => item.id === this.product.sugar).name);
    }

    getAddings(): string {
        return this.addOnHelper.getAddOnsAsString(this.product.adding_ids);
    }

    openAddOnModal(product: CartItem) {
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '340px',
            height: '420px',
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

    openConfirmationModal() {
        const message = this.translate.instant('MESSAGES.CONFIRM-DELETING');
        let dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '300px',
            height: '200px',
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
            tap(() => this.showNotification(this.message)),
        )
            .subscribe();
    }

    removeFromCart(): Subscription {
        return this.cartService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
                updateCartCount(false, this.product.count);
                this.showNotification(this.deleteMessage);
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

}

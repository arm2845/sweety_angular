import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {AddOnsComponent} from "../../../modals/components/add-ons/add-ons.component";
import {MatDialog} from "@angular/material/dialog";
import {CartItem} from "../../models/cart-item";
import {SugarOptionsData} from "../../constants/add-on-data";
import {getAddOnsAsString} from "../../../app/helpers/addOns.helper";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {CartService} from "../../services/cart.service";

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

    constructor(
        private cartService: CartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.sugarOption = SugarOptionsData.find(item => item.id === this.product.sugar).name;
        this.addings = getAddOnsAsString(this.product.adding_ids);
    }

    openAddOnModal(product: CartItem) {
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '400px',
            height: '420px',
            data: {
                product: product,
                confirm_button_name: 'Save',
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
        let dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '300px',
            height: '200px',
            data: {
                message: 'you want to delete this item'
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
        )
            .subscribe();
    }

    removeFromCart(): Subscription {
        return this.cartService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
                updateCartCount(false, this.product.count);
            })
        )
            .subscribe();
    }

}

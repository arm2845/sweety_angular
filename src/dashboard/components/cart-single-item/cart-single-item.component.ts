import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {AddOnsComponent} from "../add-ons/add-ons.component";
import {MatDialog} from "@angular/material/dialog";
import {CartItem} from "../../models/cart-item";
import {SugarOptionsData} from "../../constants/add-on-data";
import {getAddOnsAsString} from "../../../app/helpers/addOns.helper";

@Component({
    selector: 'app-cart-single-item',
    templateUrl: './cart-single-item.component.html',
    styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
    @Input() product: CartItem;
    @Output() itemDeleted = new EventEmitter;
    sugarOption: string;
    addings: string;

    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.sugarOption = SugarOptionsData.find(item => item.id === this.product.sugar).name;
        this.addings = getAddOnsAsString(this.product.adding_ids);
    }

    openDialog(product: CartItem) {
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

    updateCartItem(requestData: any): Subscription {
        return this.authService.updateCartItem(requestData.id, requestData.data)
            .subscribe();
    }

    removeFromCart(): Subscription {
        return this.authService.removeFromCart(this.product.id).pipe(
            tap(() => {
                this.itemDeleted.emit(this.product);
                updateCartCount(false, this.product.count);
            })
        )
            .subscribe();
    }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {AddOnsComponent} from "../add-ons/add-ons.component";
import {MatDialog} from "@angular/material/dialog";
import {CartItem} from "../../models/cart-item";
import {SugarOptions, SugarOptionsData} from "../../constants/add-on-data";

@Component({
    selector: 'app-cart-single-item',
    templateUrl: './cart-single-item.component.html',
    styleUrls: ['./cart-single-item.component.scss']
})
export class CartSingleItemComponent implements OnInit {
    @Input() product: CartItem;
    @Output() itemDeleted = new EventEmitter;
    sugarOption: string;

    constructor(
        private authService: AuthService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.sugarOption = SugarOptionsData.find(item => item.id === this.product.sugar).name;
    }

    openDialog(product: CartItem) {
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '400px',
            height: '420px',
            data: {
                product: product
            },
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

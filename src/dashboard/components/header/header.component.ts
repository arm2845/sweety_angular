import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthUser: boolean;

    get itemsInCart(): number {
        return this.cartService.getCartCount();
    }

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.isAuthUser = !!localStorage.getItem('token');
        if (this.isAuthUser) {
            this.getCart();
        }
    }

    getCart(): Subscription {
        return this.cartService.getCart().pipe(
            tap((res: any) => {
                localStorage.setItem('cartCount', res.meta.total_count);
            }),
        )
            .subscribe();
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

    openConfirmationModal() {
        let dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '300px',
            height: '200px',
            data: {
                message: 'you want to logout'
            }
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.logOut();
                }
            })
        )
            .subscribe();
    }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuthUser: boolean;

    get itemsInCart(): number {
        return this.authService.getCartCount();
    }

    constructor(
        private authService: AuthService,
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
        return this.authService.getCart().pipe(
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

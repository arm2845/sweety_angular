import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../services/cart.service";
import {UserTypes} from "../../../auth/constants/user-types";
import {TranslateService} from "@ngx-translate/core";
import {LanguagesData} from "../../constants/languages";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userTypes = UserTypes;
    languages = LanguagesData;

    readonly confirmLogoutMessage = this.translate.instant('MESSAGES.CONFIRM-LOG-OUT');

    get itemsInCart(): number {
        return this.cartService.getCartCount();
    }

    get authUser(): string {
        return this.authService.getAuthUser();
    }

    get userType(): number {
        return this.authService.getUserType();
    }

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        public dialog: MatDialog,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        if (this.authUser && this.userType !== this.userTypes.admin) {
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
                message: this.confirmLogoutMessage,
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

    openDropdown(): void {
        document.getElementById("languageDropdown").classList.toggle("show");
    }

    closeDropdown(): void {
        document.getElementById("languageDropdown").classList.remove("show");
    }

    changeLanguage(language: string): void {
        this.translate.use(language);
        this.closeDropdown();
    }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {MenuProduct} from "../../models/menu-product";
import {ProductSingleOptions} from "../../constants/product-single-options";
import {updateCartCount} from "../../../app/helpers/cart-count.helper";
import {MatDialog} from "@angular/material/dialog";
import {AddOnsComponent} from "../../../modals/components/add-ons/add-ons.component";
import {ProductAdditionalData} from "../../interfaces/product-additional-data";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {UserTypes} from "../../../auth/constants/user-types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopUpNotificationComponent} from "../../../modals/components/pop-up-notification/pop-up-notification.component";

@Component({
    selector: 'app-product-single',
    templateUrl: './product-single.component.html',
    styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
    @Input() product: MenuProduct;
    @Input() pageOption: number;
    @Output() removeFromFavorites = new EventEmitter();

    userTypes = UserTypes;
    readonly message = "Item was added successfully.";

    get userType(): number {
        return this.authService.getUserType();
    }

    get authUser(): string {
        return this.authService.getAuthUser();
    }

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        public dialog: MatDialog,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {}

    changeFavoriteState(): Subscription | void {
        if (!localStorage.getItem('token')) {
            this.navigateToLoginPage();
            return;
        }
        if (this.product.is_favourite) {
            return this.authService.removeFromFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = false;
                    if (this.pageOption === ProductSingleOptions.favourites) {
                        this.removeFromFavorites?.emit(this.product);
                    }
                }),
            )
                .subscribe();
        } else {
            return this.authService.addToFavorites(this.product.id).pipe(
                tap(() => {
                    this.product.is_favourite = true;
                }),
            )
                .subscribe();
        }
    }

    addToCart(data: ProductAdditionalData): Subscription {
        return this.cartService.addToCart(this.product.id, data).pipe(
            tap(() => updateCartCount(true, data.count)),
            tap(() => this.showNotification()),
        )
            .subscribe();
    }

    openDialog(product: MenuProduct) {
        if (!localStorage.getItem('token')) {
            this.navigateToLoginPage();
            return;
        }
        let dialogRef = this.dialog.open(AddOnsComponent, {
            maxWidth: '90vh',
            width: '340px',
            height: '420px',
            data: {
                product: product,
                confirm_button_name: 'Add to Cart',
            },
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.addToCart(result.data);
                }
            })
        )
            .subscribe();
    }

    showNotification() {
        this.snackBar.openFromComponent(PopUpNotificationComponent, {
            data: {
                message: this.message,
            },
            duration: 5000,
        });
    }

    private navigateToLoginPage(): void {
        this.router.navigate(['/user/auth']);
    }

}

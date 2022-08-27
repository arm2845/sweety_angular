import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";

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
                localStorage.setItem('cartCount', res.data.total_count);
            }),
        )
            .subscribe();
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

}

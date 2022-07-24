import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {User} from "../../../auth/models/user";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    authUser: boolean | undefined;
    itemsInCart: number | undefined;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.authUser = !!localStorage.getItem('user');
        this.itemsInCart = this.authService.authUser?.cart.total_count;
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

}

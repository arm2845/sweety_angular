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
    authUser: User | undefined;
    itemsInCart: number | undefined;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.authUser = this.authService.authUser;
        this.itemsInCart = this.authUser?.cart.total_count;
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

}

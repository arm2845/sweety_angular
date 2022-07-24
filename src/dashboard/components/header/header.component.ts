import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription} from "rxjs";
import {parseObj} from "../../../app/helpers/json.helper";
import {User} from "../../../auth/models/user";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    authUser: User | undefined;
    isAuthUser: boolean | undefined;
    itemsInCart: number | undefined;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.isAuthUser = !!localStorage.getItem('token');
        this.authUser = parseObj(localStorage.getItem('user'));
        this.itemsInCart = this.authUser?.cart.total_count;
        console.log(this.itemsInCart)
        console.log(localStorage)
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

}

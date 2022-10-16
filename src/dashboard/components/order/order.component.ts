import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {finalize, Subscription, tap} from "rxjs";
import {SugarOptionsData} from "../../constants/add-on-data";
import {getAddOnsAsString} from "../../../app/helpers/addOns.helper";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    isLoading = true;
    orders: any = [];

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.getOrders();
    }

    getSugarOption(id: number): string {
        return SugarOptionsData.find(item => item.id === id).name;
    }

    getAddOns(ids: number[]): string {
        return getAddOnsAsString(ids);
    }

    private getOrders(): Subscription {
        return this.authService.getOrders().pipe(
            tap((res) => this.orders = res.data),
            finalize(() => this.isLoading = false),
        )
            .subscribe();
    }

}

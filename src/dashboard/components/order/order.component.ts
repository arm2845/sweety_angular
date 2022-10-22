import {Component, OnInit} from '@angular/core';
import {finalize, Subscription, tap} from "rxjs";
import {SugarOptionsData} from "../../constants/add-on-data";
import {getAddOnsAsString} from "../../../app/helpers/addOns.helper";
import {OrderService} from "../../services/order.service";
import {OrderStatusesData} from "../../constants/order-statuses";
import {PaymentTypesData} from "../../constants/payment-types";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    isLoading = true;
    orders: any = [];

    constructor(
        private orderService: OrderService,
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

    getOrderStatus(status: number): string {
        return OrderStatusesData.find(item => item.id === status).name;
    }

    getStatusColor(status: number): string {
        return OrderStatusesData.find(item => item.id === status).color;
    }

    getPaymentType(id: number): string {
        return PaymentTypesData.find(item => item.id === id).name;
    }

    private getOrders(): Subscription {
        return this.orderService.getOrders().pipe(
            tap((res) => this.orders = res.data),
            finalize(() => this.isLoading = false),
        )
            .subscribe();
    }

}

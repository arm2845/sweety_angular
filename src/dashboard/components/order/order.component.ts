import {Component, OnInit} from '@angular/core';
import {finalize, Subscription, tap} from "rxjs";
import {SugarOptionsData} from "../../constants/add-on-data";
import {getAddOnsAsString} from "../../../app/helpers/addOns.helper";
import {OrderService} from "../../services/order.service";
import {OrderStatuses, OrderStatusesData} from "../../constants/order-statuses";
import {PaymentTypesData} from "../../constants/payment-types";
import {Order} from "../../models/order";
import {UserTypes} from "../../../auth/constants/user-types";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    isLoading = true;
    orders: Order[] = [];
    userType: number;
    userTypes = UserTypes;

    readonly orderStatuses = OrderStatuses;

    constructor(
        private orderService: OrderService,
    ) {
    }

    ngOnInit(): void {
        this.userType = Number(localStorage.getItem('userType'));
        // this.getOrders();
        this.orderService.getServerSentEvent('http://resto.3spiders.com/api/recent-orders').pipe(
            tap((res: any) => {
                this.orders = res;
                this.isLoading = false;
            })
        )
            .subscribe();
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

    acceptOrder(orderId: number): Subscription {
        return this.orderService.updateOrderStatus(orderId, {
            status: OrderStatuses.accepted
        }).pipe(
            tap((data) => this.updateOrderStatus(orderId, data.data.status)),
        )
            .subscribe();
    }

    rejectOrder(orderId: number): Subscription {
        return this.orderService.updateOrderStatus(orderId, {
            status: OrderStatuses.rejected
        }).pipe(
            tap((data) => this.updateOrderStatus(orderId, data.data.status)),
        )
            .subscribe();
    }

    closeOrder(orderId: number): Subscription {
        return this.orderService.updateOrderStatus(orderId, {
            status: OrderStatuses.given
        }).pipe(
            tap((data) => this.updateOrderStatus(orderId, data.data.status)),
        )
            .subscribe();
    }

    updateOrderStatus(orderId: number, status: number): void {
        this.orders.find(item => item.id === orderId).status = status;
    }

    private getOrders(): Subscription {
        return this.orderService.getOrders().pipe(
            tap((res) => this.orders = res.data),
            finalize(() => this.isLoading = false),
        )
            .subscribe();
    }

}

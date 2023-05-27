import {Component, OnInit} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {SugarOptionsData} from "../../constants/add-on-data";
import {OrderService} from "../../services/order.service";
import {OrderStatuses, OrderStatusesData} from "../../constants/order-statuses";
import {PaymentTypesData} from "../../constants/payment-types";
import {Order} from "../../models/order";
import {UserTypes} from "../../../auth/constants/user-types";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {MenuProduct} from "../../models/menu-product";
import {Adding} from "../../models/adding";
import {getTranslatedProductName} from "../../../app/helpers/language.helper";

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
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.userType = Number(localStorage.getItem('userType'));
        this.orderService.getServerSentEvent(`${environment.baseURL}recent-orders`).pipe(
            tap((res: any) => {
                this.orders = res;
                this.isLoading = false;
            })
        )
            .subscribe();
    }

    getSugarOption(id: number): string {
        return this.translate.instant(SugarOptionsData.find(item => item.id === id).name);
    }

    getAddingName(item: MenuProduct, id: number): string {
        const adding = item.addings.find(adding => adding.id === id);
        return this.getName(adding);
    }

    getName(product: MenuProduct | Adding): string {
        return getTranslatedProductName(product);
    }

    getOrderStatus(status: number): string {
        return this.translate.instant(OrderStatusesData.find(item => item.id === status).name);
    }

    getStatusColor(status: number): string {
        return OrderStatusesData.find(item => item.id === status).color;
    }

    getPaymentType(id: number): string {
        return this.translate.instant(PaymentTypesData.find(item => item.id === id).name);
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

    markAsReady(orderId: number): Subscription {
        return this.orderService.updateOrderStatus(orderId, {
            status: OrderStatuses.ready
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

}

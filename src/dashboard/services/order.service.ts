import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderData} from "../interfaces/order-data";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getOrders(): Observable<any> {
        return this.http.get('orders');
    }

    placeOrder(data: OrderData): Observable<any> {
        return this.http.post('orders', data);
    }
}

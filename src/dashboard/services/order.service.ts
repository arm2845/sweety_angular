import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderData} from "../interfaces/order-data";
import {SseService} from "./sse.service";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient,
        private zone: NgZone,
        private sscService: SseService,
    ) {
    }

    getOrders(): Observable<any> {
        return this.http.get('orders');
    }

    placeOrder(data: OrderData): Observable<any> {
        return this.http.post('orders', data);
    }

    updateOrderStatus(orderId: number, data: {status: number}): Observable<any> {
        return this.http.patch(`orders/${orderId}`, data);
    }

    getServerSentEvent(url: string) {
        // @ts-ignore
        return Observable.create(observer => {
            const eventSource = this.sscService.getEventSourceWithGet(url);

            eventSource.stream();

            // @ts-ignore
            eventSource.onmessage = (event) => {
                this.zone.run(() => {
                    observer.next(JSON.parse(event.data));
                })
            };

            // @ts-ignore
            eventSource.onerror = (error) => {
                this.zone.run(() => {
                    window.location.reload();
                    observer.error(error);
                })
            };

        })
    }

}

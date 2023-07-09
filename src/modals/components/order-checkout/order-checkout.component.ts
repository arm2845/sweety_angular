import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OrderData} from "../../../dashboard/interfaces/order-data";
import {PaymentTypesData} from "../../../dashboard/constants/payment-types";

@Component({
    selector: 'app-order-checkout',
    templateUrl: './order-checkout.component.html',
    styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent {
    @ViewChild('comment', { static: true }) textarea: ElementRef;
    paymentTypes = PaymentTypesData;
    selectedPaymentType: number;
    selectedTime: string;
    minTime = '10:00';
    maxTime = '23:59'

    get orderData(): OrderData {
        return {
            payment_type: this.selectedPaymentType,
            order_time: this.selectedTime,
            note: this.textarea.nativeElement.value
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    setSelectedValue(id: number): void {
        this.selectedPaymentType = id;
    }

}

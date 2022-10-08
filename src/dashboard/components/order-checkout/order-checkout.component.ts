import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OrderData} from "../../interfaces/order-data";
import {PaymentTypesData} from "../../constants/payment-types";

@Component({
    selector: 'app-order-checkout',
    templateUrl: './order-checkout.component.html',
    styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {
    @ViewChild('comment', { static: true }) textarea: ElementRef;
    paymentTypes = PaymentTypesData;
    selectedPaymentType: number;

    get orderData(): OrderData {
        return {
            payment_type: this.selectedPaymentType,
            comment: this.textarea.nativeElement.value,
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
    }

    setSelectedValue(id: number) {
        this.selectedPaymentType = id;
    }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationModalComponent} from "./components/confirmation-modal/confirmation-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {OrderCheckoutComponent} from "./components/order-checkout/order-checkout.component";
import {AddOnsComponent} from "./components/add-ons/add-ons.component";


@NgModule({
    declarations: [
        ConfirmationModalComponent,
        OrderCheckoutComponent,
        AddOnsComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ]
})
export class ModalsModule {
}

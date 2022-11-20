import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationModalComponent} from "./components/confirmation-modal/confirmation-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {OrderCheckoutComponent} from "./components/order-checkout/order-checkout.component";
import {AddOnsComponent} from "./components/add-ons/add-ons.component";
import { PopUpNotificationComponent } from './components/pop-up-notification/pop-up-notification.component';
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
    declarations: [
        ConfirmationModalComponent,
        OrderCheckoutComponent,
        AddOnsComponent,
        PopUpNotificationComponent,
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class ModalsModule {
}

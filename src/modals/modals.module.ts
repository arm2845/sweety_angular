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
import {TranslateModule} from "@ngx-translate/core";
import { DownloadReportComponent } from './components/download-report/download-report.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ConfirmationModalComponent,
        OrderCheckoutComponent,
        AddOnsComponent,
        PopUpNotificationComponent,
        DownloadReportComponent,
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class ModalsModule {
}

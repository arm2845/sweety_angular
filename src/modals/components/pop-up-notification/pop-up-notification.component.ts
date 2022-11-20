import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
    selector: 'app-pop-up-notification',
    templateUrl: './pop-up-notification.component.html',
    styleUrls: ['./pop-up-notification.component.scss']
})
export class PopUpNotificationComponent implements OnInit {

    constructor(
        public sbRef: MatSnackBarRef<PopUpNotificationComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any,
    ) {
    }

    ngOnInit(): void {
    }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {ConfirmationModalComponent} from "../../../modals/components/confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../services/cart.service";
import {UserTypes} from "../../../auth/constants/user-types";
import {TranslateService} from "@ngx-translate/core";
import {Language, LanguagesData} from "../../constants/languages";
import {MainService} from "../../services/main.service";
import {saveAs} from "file-saver";
import {DownloadReportComponent} from "../../../modals/components/download-report/download-report.component";
import {getFormattedDate} from "../../../app/helpers/date.helper";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userTypes = UserTypes;
    languages = LanguagesData;

    readonly confirmLogoutMessage = this.translate.instant('MESSAGES.CONFIRM-LOG-OUT');

    get itemsInCart(): number {
        return this.cartService.getCartCount();
    }

    get authUser(): string {
        return this.authService.getAuthUser();
    }

    get userType(): number {
        return this.authService.getUserType();
    }

    constructor(
        private authService: AuthService,
        private cartService: CartService,
        public dialog: MatDialog,
        private translate: TranslateService,
        private mainService: MainService,
    ) {}

    ngOnInit(): void {
        if (this.authUser && this.userType !== this.userTypes.admin) {
            this.getCart();
        }
    }

    getExcel(data: {start_date: string, end_date: string}): Subscription {
        return this.mainService.getExcelFile(data).pipe(
            tap((res) => {
                const fileName = "report_by_" + getFormattedDate(new Date()) + ".xlsx";
                saveAs(res, fileName)
            }),
        )
            .subscribe();
    }

    getCart(): Subscription {
        return this.cartService.getCart().pipe(
            tap((res: any) => {
                localStorage.setItem('cartCount', res.meta.total_count);
            }),
        )
            .subscribe();
    }

    logOut(): Subscription {
        return this.authService.logout()
            .subscribe();
    }

    openConfirmationModal(): void {
        let dialogRef = this.dialog.open(ConfirmationModalComponent, {
            width: '300px',
            height: 'auto',
            data: {
                message: this.confirmLogoutMessage,
            }
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.logOut();
                }
            })
        )
            .subscribe();
    }

    openDownloadExcelModal(): void {
        let dialogRef = this.dialog.open(DownloadReportComponent, {
            width: '400px',
            height: 'auto',
        });
        dialogRef.afterClosed().pipe(
            tap((result) => {
                if (result) {
                    this.getExcel(result);
                }
            })
        )
            .subscribe();
    }

    openDropdown(): void {
        document.getElementById("languageDropdown").classList.toggle("show");
    }

    closeDropdown(): void {
        document.getElementById("languageDropdown").classList.remove("show");
    }

    changeLanguage(language: Language): Subscription | void {
        const authUser = JSON.parse(this.authUser)
        if (authUser) {
            return this.authService.changeLanguage(authUser.id, {lang: language.id}).pipe(
                tap(() => {
                    this.setLanguageAndCloseDropdown(language);
                })
            )
                .subscribe();
        } else {
            this.setLanguageAndCloseDropdown(language);

        }
    }

    setLanguageAndCloseDropdown(language: Language): void {
        this.translate.use(language.name);
        localStorage.setItem('lang', String(language.id));
        this.closeDropdown();
    }

}

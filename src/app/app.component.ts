import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LanguagesData} from "../dashboard/constants/languages";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'sweety-angular';
    defaultLanguage = 'en';

    constructor(
        private translate: TranslateService,
    ) {
        const langInLocalStorage = localStorage.getItem('lang');
        const language = langInLocalStorage ? LanguagesData.find(lang => lang.id === Number(langInLocalStorage)).name
            : this.defaultLanguage;
        translate.setDefaultLang(language);
        translate.use(language);
    }
}

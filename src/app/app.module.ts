import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "../auth/auth.module";
import {RouterModule} from "@angular/router";
import {ApiInterceptor} from "./interceptors/api.interceptor";
import {DashboardModule} from "../dashboard/dashboard.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalsModule} from "../modals/modals.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        AuthModule,
        RouterModule,
        DashboardModule,
        BrowserAnimationsModule,
        ModalsModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}

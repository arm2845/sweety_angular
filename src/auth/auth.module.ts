import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { StartAuthComponent } from './components/start-auth/start-auth.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../app/interceptors/token.interceptor";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    StartAuthComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class AuthModule { }

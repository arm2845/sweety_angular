import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import {CommonModule} from "@angular/common";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainService } from "./services/main.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CartComponent } from './components/cart/cart.component';
import {AuthModule} from "../auth/auth.module";
import {RouterModule} from "@angular/router";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    ProductListingComponent,
    ProductSingleComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    AuthModule,
    RouterModule,
  ],
  providers: [
    MainService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  exports: [
    HeaderComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    AppComponent,
    MenuNavComponent,
    ProductListingComponent,
    ProductSingleComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

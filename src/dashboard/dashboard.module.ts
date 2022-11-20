import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from "./components/cart/cart.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";
import {ProductListingComponent} from "./components/product-listing/product-listing.component";
import {ProductSingleComponent} from "./components/product-single/product-single.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MainService} from "./services/main.service";
import {CartSingleItemComponent} from './components/cart-single-item/cart-single-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OrderComponent } from './components/order/order.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import {FormsModule} from "@angular/forms";
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        CartComponent,
        FavouritesComponent,
        FooterComponent,
        HeaderComponent,
        MenuNavComponent,
        ProductListingComponent,
        ProductSingleComponent,
        CartSingleItemComponent,
        LoaderComponent,
        OrderComponent,
        IngredientsComponent,
        ClickedOutsideDirective,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        MatButtonModule,
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [
        MainService,
    ]
})
export class DashboardModule {
}

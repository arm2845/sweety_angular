import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";
import {CartComponent} from "./components/cart/cart.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";

const routes: Routes = [
    {
        path: 'dashboard',
        children: [
            {
                path: 'menu/:id',
                component: MenuNavComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'favourites',
                component: FavouritesComponent,
            },
            {
                path: '**',
                redirectTo: 'menu/1',
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {
}

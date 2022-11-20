import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";
import {CartComponent} from "./components/cart/cart.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";
import {OrderComponent} from "./components/order/order.component";
import {IngredientsComponent} from "./components/ingredients/ingredients.component";
import {IsAuthGuard} from "../app/guards/is-auth.guard";
import {IsAdminGuard} from "../app/guards/is-admin.guard";
import {IsNotAdminGuard} from "../app/guards/is-not-admin.guard";

const routes: Routes = [
    {
        path: 'dashboard',
        children: [
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'favourites',
                component: FavouritesComponent,
            },
        ],
        canActivate: [IsAuthGuard, IsNotAdminGuard],
    },
    {
        path: 'dashboard/order',
        component: OrderComponent,
        canActivate: [IsAuthGuard],
    },
    {
        path: 'dashboard/ingredients',
        component: IngredientsComponent,
        canActivate: [IsAuthGuard, IsAdminGuard],
    },
    {
        path: 'dashboard/menu/:id',
        component: MenuNavComponent,
    },
    {
        path: '**',
        redirectTo: 'dashboard/menu/1',
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

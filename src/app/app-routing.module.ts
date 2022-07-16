import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  {
    path: 'menu/:id',
    component: MenuNavComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '**',
    redirectTo: 'menu/1',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

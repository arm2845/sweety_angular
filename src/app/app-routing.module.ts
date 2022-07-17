import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";
import {CartComponent} from "./components/cart/cart.component";
import {LoginComponent} from "../auth/components/login/login.component";
import {StartAuthComponent} from "../auth/components/start-auth/start-auth.component";
import {RegisterComponent} from "../auth/components/register/register.component";

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
    path: 'auth',
    component: StartAuthComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./components/login/login.component";
import {StartAuthComponent} from "./components/start-auth/start-auth.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {
    path: 'user',
    children: [
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
        redirectTo: 'auth',
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
export class AuthRoutingModule { }

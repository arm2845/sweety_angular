import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {MenuNavComponent} from "./components/menu-nav/menu-nav.component";

const routes: Routes = [
  {
    path: 'menu/:id',
    component: MenuNavComponent
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

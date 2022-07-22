import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.products = this.authService.authUser?.cart || [];
  }

  removeFromCart(productId: number): Subscription {
    return this.authService.removeFromCart(productId)
      .subscribe();
  }

}

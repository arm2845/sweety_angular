import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription, tap} from "rxjs";
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
    this.products = this.authService.authUser?.cart.items || [];
  }

  deleteItemFromCart(product: Product) {
    let index = this.products.findIndex(item => item.id == product.id);
    this.products.splice(index, 1);
  }

}

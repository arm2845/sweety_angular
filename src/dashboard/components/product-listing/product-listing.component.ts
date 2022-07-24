import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  @Input() products: Product[] = [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  changeFavoriteState(data: Product): void {
    let index = this.authService.authUser?.favourites.findIndex(item => item.id == data.id);
    // @ts-ignore
    index == -1 ? this.authService.authUser?.favourites.push(data) : this.authService.authUser?.favourites.splice(index, 1);
  }

}

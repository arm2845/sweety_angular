import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  @Input() product: any;
  isFavorite: boolean | undefined;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.authService.authUser) {
      if (this.authService.authUser?.favourites?.findIndex(item => item.id == this.product.id) != -1) {
        this.isFavorite = true;
      }
    }
  }

  changeFavoriteState(): Subscription {
    if (this.isFavorite) {
      return this.authService.removeFromFavorites(this.product.id).pipe(
        tap(() => this.isFavorite = false),
      )
        .subscribe();
    } else {
      return this.authService.addToFavorites(this.product.id).pipe(
        tap(() => this.isFavorite = true),
      )
        .subscribe();
    }
  }

}

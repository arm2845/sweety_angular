import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Subscription, tap} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  @Input() product: any;
  @Output() favoriteStateChanged = new EventEmitter<any>();
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
        tap(() => {
          this.isFavorite = false;
          this.favoriteStateChanged?.emit(this.product);
        }),
      )
        .subscribe();
    } else {
      return this.authService.addToFavorites(this.product.id).pipe(
        tap(() => {
          this.isFavorite = true;
          this.favoriteStateChanged?.emit(this.product);
        }),
      )
        .subscribe();
    }
  }

  addToCart(): Subscription {
    return this.authService.addToCart(this.product.id).pipe(
      tap(() => {
        this.authService.authUser?.cart.items.push(this.product);
        // @ts-ignore
        this.authService.authUser?.cart.total_count += 1;
      })
    )
      .subscribe();
  }

}

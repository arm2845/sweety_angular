import {Component, OnInit} from '@angular/core';
import {MenuProduct} from "../../models/menu-product";
import {AuthService} from "../../../auth/services/auth.service";
import {finalize, Subscription, tap} from "rxjs";
import {ProductSingleOptions} from "../../constants/product-single-options";

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    favourites: MenuProduct[] = [];
    pageOptions = ProductSingleOptions;
    isLoading = true;

    constructor(
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.getFavourites();
    }

    getFavourites(): Subscription {
        return this.authService.getFavourites().pipe(
            tap((res: any) => {
                this.favourites = res.data.items;
            }),
            finalize(() => this.isLoading = false),
        )
            .subscribe()
    }

    remove(product: MenuProduct): void {
        const index = this.favourites.findIndex(item => item.id === product.id);
        this.favourites.splice(index, 1);
    }

}

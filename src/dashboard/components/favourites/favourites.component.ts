import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
    items: Product[] = [];

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.items = this.authService.authUser?.favourites || [];
    }

    changeFavoriteState(product: Product) {
        const index = this.items.findIndex(item => item.id == product.id);
        this.items.splice(index, 1);
    }

}

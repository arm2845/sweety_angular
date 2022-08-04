import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";

@Component({
    selector: 'app-product-listing',
    templateUrl: './product-listing.component.html',
    styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

    @Input() products: Product[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    changeFavoriteState(data: Product): void {
        let index = this.products.findIndex(item => item.id == data.id);
        index == -1 ? this.products.push(data) : this.products.splice(index, 1);
    }

}

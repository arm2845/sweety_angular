import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductSingleOptions} from "../../constants/product-single-options";

@Component({
    selector: 'app-product-listing',
    templateUrl: './product-listing.component.html',
    styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

    @Input() products: Product[] = [];

    pageOptions = ProductSingleOptions;

    constructor() {
    }

    ngOnInit(): void {
    }

}

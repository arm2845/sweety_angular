import {Component, Input} from '@angular/core';
import {MenuProduct} from "../../models/menu-product";
import {ProductSingleOptions} from "../../constants/product-single-options";

@Component({
    selector: 'app-product-listing',
    templateUrl: './product-listing.component.html',
    styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {

    @Input() products: MenuProduct[] = [];

    pageOptions = ProductSingleOptions;

}

import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductAdditionalData} from "../../interfaces/product-additional-data";
import {AddingOptions, SugarOptions} from "../../constants/add-on-data";
import {ProductWithAddOn} from "../../interfaces/product-with-add-on";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    product: ProductWithAddOn;
    selectedSugarOption: number;
    selectedAddingOption: number;
    readonly minAllowedQuantity = 1;
    readonly sugarOptions = SugarOptions;
    readonly addingOptions = AddingOptions;

    get productAdditionalData(): ProductAdditionalData {
        return  {
            adding_id: this.selectedAddingOption,
            sugar: this.selectedSugarOption,
            count: this.product.count,
        };
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.product = this.getProductData();
        this.selectedSugarOption = this.product.sugar;
        this.selectedAddingOption = this.product.adding?.id;
    }

    getProductData(): ProductWithAddOn {
        return {
            name_en: this.data.product.name_en || this.data.product?.item.name_en,
            price: this.data.product.price || this.data.product?.item.price,
            count: this.data.product.count || 1,
            sugar: this.data.product?.sugar || null,
            adding: this.data.product?.adding || null,
        };
    }

    setSugarOption(id: number) {
        this.selectedSugarOption = id;
    }

    setAddingOption(id: number) {
        this.selectedAddingOption = id;
    }

    increase(): void {
        this.product.count += 1;
    }

    decrease(): void {
        if (this.product.count > 1) {
            this.product.count -= 1;
        }
    }

}

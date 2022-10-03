import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductAdditionalData} from "../../interfaces/product-additional-data";
import {AddingOptions, SugarOptions} from "../../constants/add-on-data";
import {ProductWithAddOn} from "../../interfaces/product-with-add-on";
import {getAddOnPrice} from "../../../app/helpers/addOns.helper";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    product: ProductWithAddOn;
    selectedSugarOption: number;
    selectedAddingOptions: number[];
    addingPrice: number;
    readonly minAllowedQuantity = 1;
    readonly sugarOptions = SugarOptions;
    readonly addingOptions = AddingOptions;

    get productAdditionalData(): ProductAdditionalData {
        return {
            adding_ids: this.selectedAddingOptions,
            sugar: this.selectedSugarOption,
            count: this.product.count,
        };
    }

    get createdOrUpdatedProductData() {
        return {
            id: this.product.id,
            data: this.productAdditionalData,
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.product = this.getProductData();
        this.selectedSugarOption = this.product.sugar;
        this.selectedAddingOptions = this.product.addings;
        this.addingPrice = this.product.adding_price;
    }

    getProductData(): ProductWithAddOn {
        return {
            id: this.data.product.id,
            name_en: this.data.product.name_en || this.data.product?.item.name_en,
            price: this.data.product?.item?.price || this.data.product.price,
            count: this.data.product.count || 1,
            sugar: this.data.product?.sugar || null,
            addings: this.data.product?.adding_ids || [],
            adding_price: this.data.product?.adding_price || 0,
        };
    }

    setSugarOption(id: number) {
        this.selectedSugarOption = id;
    }

    setAddingOptionAndUpdatePrice(id: number) {
        const index = this.selectedAddingOptions.indexOf(id);
        index === -1 ? this.selectedAddingOptions.push(id) : this.selectedAddingOptions.splice(index, 1);
        this.addingPrice = getAddOnPrice(this.product.addings);
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

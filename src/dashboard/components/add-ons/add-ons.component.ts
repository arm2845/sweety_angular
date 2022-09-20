import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "../../models/product";
import {ProductAdditionalData} from "../../interfaces/product-additional-data";
import {AddingOptions, SugarOptions} from "../../constants/add-on-data";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    selectedProduct: Product;
    selectedSugarOption: number;
    selectedAddingOption: number;
    quantity = 1;
    readonly minAllowedQuantity = 1;
    readonly sugarOptions = SugarOptions;
    readonly addingOptions = AddingOptions;


    get productAdditionalData(): ProductAdditionalData {
        return  {
            sugar: this.selectedSugarOption,
            adding: this.selectedAddingOption,
            quantity: this.quantity,
        };
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.selectedProduct = this.data.product;
    }

    setSugarOption(id: number) {
        this.selectedSugarOption = id;
    }

    setAddingOption(id: number) {
        this.selectedAddingOption = id;
    }

    increase(): void {
        this.quantity += 1;
    }

    decrease(): void {
        if (this.quantity > 1) {
            this.quantity -= 1;
        }
    }

}

import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Product} from "../../models/product";
import {AddOn} from "../../interfaces/add-on";
import {AddingOptions, SugarOptions} from "../../constants/add-on-data";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    selectedProduct: Product;
    addOnData: AddOn = {};
    selectedSugarOption: number;
    selectedAddingOption: number;
    readonly sugarOptions = SugarOptions;
    readonly addingOptions = AddingOptions;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.selectedProduct = this.data.product;
    }

    setSugarOption(id: number) {
        this.addOnData.sugar = id;
        this.selectedSugarOption = id;
    }

    setAddingOption(id: number) {
        this.addOnData.adding = id;
        this.selectedAddingOption = id;
    }

}

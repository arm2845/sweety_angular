import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductAdditionalData} from "../../../dashboard/interfaces/product-additional-data";
import {
    MIX_ID,
    productIdsIncludingAddOnPrice,
    SugarOptions
} from "../../../dashboard/constants/add-on-data";
import {ProductWithAddOn} from "../../../dashboard/interfaces/product-with-add-on";
import {getAddOnPrice} from "../../../app/helpers/addOns.helper";
import {getTranslatedProductName} from "../../../auth/helpers/language.helper";
import {PopUpNotificationComponent} from "../pop-up-notification/pop-up-notification.component";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    product: ProductWithAddOn;
    selectedSugarOption: number;
    selectedAddings: number[];
    selectedIngredients: any[] = [];
    allAddings: any[];
    addingPrice: number;
    readonly mix_id = MIX_ID;
    readonly minAllowedQuantity = 1;
    readonly sugarOptions = SugarOptions;

    get productAdditionalData(): ProductAdditionalData {
        const data = {
            adding_ids: this.selectedAddings,
            sugar: this.selectedSugarOption,
            count: this.product.count,
        };
        if (this.product.id === this.mix_id) {
            return {...data, ingredient_ids: this.getSelectedIngredientIds()};
        } else {
            return data;
        }
    }

    get createdOrUpdatedProductData() {
        return {
            id: this.product.id,
            data: this.productAdditionalData,
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: MatSnackBar,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.product = this.getProductData();
        this.selectedSugarOption = this.product.sugar;
        this.selectedAddings = this.product.selectedAddings;
        this.allAddings = this.product.allAvailableAddings;
        this.addingPrice = this.product.adding_price;
    }

    getProductData(): ProductWithAddOn {
        return {
            id: this.data.product.id,
            name_en: this.data.product.name_en || this.data.product?.item?.name_en,
            name_hy: this.data.product.name_hy || this.data.product?.item?.name_hy,
            name_ru: this.data.product.name_ru || this.data.product?.item?.name_ru,
            price: this.data.product?.item?.price || this.data.product.price,
            count: this.data.product.count || 1,
            sugar: this.data.product?.sugar || null,
            has_sugar: this.data.product.has_sugar || this.data.product?.item?.has_sugar,
            selectedAddings: this.data.product?.adding_ids || [],
            adding_price: this.data.product?.adding_price || 0,
            allAvailableAddings: this.data.product.addings || this.data.product?.item?.addings,
            product_id: this.data.product?.item?.id || this.data.product.id,
            ingredients: this.data.product?.item?.ingredients || this.data.product.ingredients
        };
    }

    setSugarOption(id: number) {
        this.selectedSugarOption = id;
    }

    setAddingOptionAndUpdatePrice(id: number) {
        const index = this.selectedAddings.indexOf(id);
        if (productIdsIncludingAddOnPrice.includes(this.product.product_id)) {
            index === -1 ? this.selectedAddings = [id] : this.selectedAddings.push(id);
            return;
        }
        index === -1 ? this.selectedAddings.push(id) : this.selectedAddings.splice(index, 1);
        this.addingPrice = this.selectedAddings.length ? getAddOnPrice(this.selectedAddings, this.product) : 0;
    }

    ingredientIsSelected(item: any): boolean {
        return this.selectedIngredients.findIndex(it => it.id === item.id) !== -1;
    }

    setIngredientsAndUpdatePrice(item: any): void {
        const index = this.selectedIngredients.findIndex(it => it.id === item.id);
        if (index === -1) {
            this.selectedIngredients.length < 3 ? this.selectedIngredients.push(item) : this.showNotification();
        } else {
            this.selectedIngredients.splice(index, 1);
        }
        const prices: number[] = [];
        this.selectedIngredients.forEach(it => prices.push(it.price));
        this.product.price = prices.length ? Math.max(...prices) : 0;
    }

    increase(): void {
        this.product.count += 1;
    }

    decrease(): void {
        if (this.product.count > 1) {
            this.product.count -= 1;
        }
    }

    addingIsAvailable(value: any): boolean {
        return this.product.allAvailableAddings.findIndex(item => item.id === value) !== -1;
    }

    getProductName(product: ProductWithAddOn): string {
        return getTranslatedProductName(product);
    }

    getName(product: ProductWithAddOn): string {
        return getTranslatedProductName(product);
    }

    private showNotification(): void {
        this.snackBar.openFromComponent(PopUpNotificationComponent, {
            data: {
                message: this.translate.instant('MESSAGES.MIX-MAX-ALLOWED'),
            },
            duration: 5000,
        });
    }

    private getSelectedIngredientIds(): number[] {
        const ids: number[] = [];
        this.selectedIngredients.forEach(it => ids.push(it.id));
        return ids;
    }
}

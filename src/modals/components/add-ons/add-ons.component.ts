import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductAdditionalData} from "../../../dashboard/interfaces/product-additional-data";
import {MIX_ID, SugarOptions} from "../../../dashboard/constants/add-on-data";
import {ProductWithAddOn} from "../../../dashboard/interfaces/product-with-add-on";
import {getAddOnPrice} from "../../../app/helpers/addOns.helper";
import {getTranslatedProductName} from "../../../auth/helpers/language.helper";
import {PopUpNotificationComponent} from "../pop-up-notification/pop-up-notification.component";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Mix} from "../../../dashboard/models/mix";
import {Adding} from "../../../dashboard/models/adding";

@Component({
    selector: 'app-add-ons',
    templateUrl: './add-ons.component.html',
    styleUrls: ['./add-ons.component.scss']
})
export class AddOnsComponent implements OnInit {
    product: ProductWithAddOn;
    selectedSugarOption: number;
    selectedAddings: number[];
    selectedMixes: Mix[] = [];
    allAddings: Adding[];
    addingPrice: number;
    readonly mix_id = MIX_ID;
    readonly minAllowedQuantity = 1;
    readonly sugarOptions = SugarOptions;

    get productAdditionalData(): ProductAdditionalData {
        return  {
            adding_ids: this.selectedAddings,
            mix_ids: this.getSelectedMixIds(),
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
            mixes: this.data.product?.item?.mixes || this.data.product.mixes,
            price_includes_addings: this.data.product?.item?.price_includes_addings || this.data.product.price_includes_addings
        };
    }

    setSugarOption(id: number): void {
        this.selectedSugarOption = id;
    }

    setAddingOptionAndUpdatePrice(id: number): void {
        const index = this.selectedAddings.indexOf(id);
        if (this.product.price_includes_addings) {
            index === -1 ? this.selectedAddings = [id] : this.selectedAddings.push(id);
            return;
        }
        index === -1 ? this.selectedAddings.push(id) : this.selectedAddings.splice(index, 1);
        this.addingPrice = this.selectedAddings.length ? getAddOnPrice(this.selectedAddings, this.product) : 0;
    }

    mixIsSelected(mix: Mix): boolean {
        return this.selectedMixes.findIndex(it => it.id === mix.id) !== -1;
    }

    setMixesAndUpdatePrice(mix: Mix): void {
        const index = this.selectedMixes.findIndex(it => it.id === mix.id);
        if (index === -1) {
            this.selectedMixes.length < 3 ? this.selectedMixes.push(mix) : this.showNotification();
        } else {
            this.selectedMixes.splice(index, 1);
        }
        const prices: number[] = [];
        this.selectedMixes.forEach(it => prices.push(it.price));
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

    getProductName(product: ProductWithAddOn | Mix): string {
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

    private getSelectedMixIds(): number[] {
        const ids: number[] = [];
        this.selectedMixes.forEach(it => ids.push(it.id));
        return ids;
    }
}

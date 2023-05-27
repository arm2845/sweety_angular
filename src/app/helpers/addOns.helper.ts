import {AddOnOptionsData, doubleAddingPrice, tripleAddingPrice} from "../../dashboard/constants/add-on-data";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";
import {ProductWithAddOn} from "../../dashboard/interfaces/product-with-add-on";

@Injectable({
    providedIn: 'root'
})
export class AddOnsHelper {
    constructor(
        private translate: TranslateService,
    ) {
    }

    getAddOnsAsString(ids: number[]): string {
        let names = this.extractAddOnNamesFromIds(ids);
        return names.join(", ");
    }

    private extractAddOnNamesFromIds(ids: number[]): string[] {
        let addOnNames: string[] = [];
        ids.forEach(id => {
            addOnNames.push(this.translate.instant(AddOnOptionsData.find(item => item.id === id).name));
        });
        return addOnNames;
    }
}

export function getAddOnPrice(addingIds: number[], product: ProductWithAddOn): number {
    if (product.price_includes_addings) {
        return 0;
    }
    const count = addingIds.length;
    switch (count) {
        case 1: return AddOnOptionsData.find(item => item.id === addingIds[0]).price;
        case 2: return doubleAddingPrice;
        case 3: return tripleAddingPrice;
        default: return 0;
    }
}

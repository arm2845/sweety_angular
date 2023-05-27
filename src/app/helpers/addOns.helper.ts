import {doubleAddingPrice, tripleAddingPrice} from "../../dashboard/constants/add-on-data";
import {ProductWithAddOn} from "../../dashboard/interfaces/product-with-add-on";

export function getAddOnPrice(addingIds: number[], product: ProductWithAddOn): number {
    if (product.price_includes_addings) {
        return 0;
    }
    const count = addingIds.length;
    switch (count) {
        case 1: return product.allAddings.find(item => item.id === addingIds[0]).price;
        case 2: return doubleAddingPrice;
        case 3: return tripleAddingPrice;
        default: return 0;
    }
}

import {MenuProduct} from "../../dashboard/models/menu-product";
import {Languages} from "../../dashboard/constants/languages";
import {ProductWithAddOn} from "../../dashboard/interfaces/product-with-add-on";
import {Ingredient} from "../../dashboard/models/ingredient";

export function getTranslatedProductName(product: MenuProduct | ProductWithAddOn | Ingredient): string {
    const language = Number(localStorage.getItem('lang'));
    switch (language) {
        case Languages.ARMENIAN: return product.name_hy;
        case Languages.RUSSIAN: return product.name_ru;
        default: return product.name_en;
    }
}

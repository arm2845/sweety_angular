import {Mix} from "../models/mix";
import {Adding} from "../models/adding";

export interface ProductWithAddOn {
    id: number;
    name_en: string;
    name_hy: string;
    name_ru: string;
    price: number;
    count: number;
    sugar?: number;
    has_sugar?: boolean;
    selectedAddings?: number[];
    allAvailableAddings?: Adding[];
    adding_price: number;
    product_id: number;
    mixes: Mix[];
    price_includes_addings: boolean;
}

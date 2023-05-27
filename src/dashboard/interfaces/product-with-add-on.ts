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
    selectedMixes?: number[];
    allAddings?: Adding[];
    allMixes?: Mix[];
    adding_price: number;
    product_id: number;
    price_includes_addings: boolean;
}

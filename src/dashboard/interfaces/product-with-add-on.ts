import {Adding} from "../models/adding";

export interface ProductWithAddOn {
    name_en: string;
    price: number;
    count: number;
    sugar?: number;
    adding?: Adding;
}

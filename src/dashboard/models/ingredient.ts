import {ADDING_TYPES} from "./adding";

export class Ingredient {
    id: number;
    name_hy: string;
    name_en: string;
    name_ru: string;
    category_id: number;
    category_name: string;
    in_stock: boolean;
    price: number;
    type: ADDING_TYPES;

    constructor(data: any) {
        this.id = data.id;
        this.name_en = data.name_en;
        this.name_hy = data.nname_hy;
        this.name_ru = data.name_ru;
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.in_stock = data.in_stock;
        this.price = data.price;
        this.type = data.type;
    }

    static transform(data: any): Ingredient {
        return new Ingredient(data);
    }
}

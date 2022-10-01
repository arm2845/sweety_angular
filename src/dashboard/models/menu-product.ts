import {Adding} from "./adding";

export class MenuProduct {
    id: number;
    category_id: number;
    price: number;
    name_en: string;
    name_hy: string;
    name_ru: string;
    is_favourite: boolean;
    hasSugar: boolean;
    addings: Adding[];

    constructor(data: any) {
        this.id = data.id;
        this.category_id = data.category_id;
        this.price = data.price;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.is_favourite = data.is_favourite;
        this.hasSugar = data.hasSugar;
        this.addings = data.addings;
    }

    public static transform(data: any): MenuProduct {
        return new MenuProduct(data);
    }
}

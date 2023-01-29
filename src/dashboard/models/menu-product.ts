import {Adding} from "./adding";

export class MenuProduct {
    id: number;
    category_id: number;
    price: number;
    name_en: string;
    name_hy: string;
    name_ru: string;
    is_favourite: boolean;
    has_sugar: boolean;
    addings: Adding[];
    order_options?: any;
    image_path: string;
    in_stock: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.category_id = data.category_id;
        this.price = data.price;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.is_favourite = data.is_favourite;
        this.has_sugar = data.has_sugar;
        this.addings = data.addings;
        this.order_options = data.order_options;
        this.image_path = data.image_path;
        this.in_stock = data.in_stock;
    }

    public static transform(data: any): MenuProduct {
        return new MenuProduct(data);
    }

    public static transformCollection(data: any): MenuProduct[] {
        let items = [];
        for (let item in data) {
            items.push(new MenuProduct(item));
        }
        return items;
    }
}

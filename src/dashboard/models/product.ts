export class Product {
    id: number;
    category_id: number;
    name_en?: string;
    name_hy?: string;
    name_ru?: string;
    desc_en?: string;
    desc_hy?: string;
    desc_ru?: string;
    price: number;
    count_in_cart: number;
    is_favourite: boolean;
    is_in_cart: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.category_id = data.category_id;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.desc_en = data.desc_en;
        this.desc_hy = data.desc_hy;
        this.desc_ru = data.desc_ru;
        this.price = data.price;
        this.count_in_cart = data.count_in_cart;
        this.is_favourite = data.is_favourite;
        this.is_in_cart = data.is_in_cart;
    }
}

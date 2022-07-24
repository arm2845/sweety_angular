export class Product {
    category_id?: number;
    desc_en?: string;
    desc_hy?: string;
    desc_ru?: string;
    name_en?: string;
    name_hy?: string;
    name_ru?: string;
    id: number;
    name: string;
    ingredients: string;
    price: number;
    url: string;
    count: number;

    constructor(data: any) {
        this.name = data.name;
        this.ingredients = data.ingredients;
        this.price = data.price;
        this.url = data.url;
        this.category_id = data.category_id;
        this.desc_en = data.desc_en;
        this.desc_hy = data.desc_hy;
        this.desc_ru = data.desc_ru;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.id = data.id;
        this.count = data.count;
    }
}

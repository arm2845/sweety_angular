export class CartItemProduct {
    id: number;
    name_en: string;
    name_hy: string;
    name_ru: string;
    price: number;

    constructor(data: any) {
        this.id = data.id;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.price = data.price;
    }

    static transform(data: any): CartItemProduct {
        return new CartItemProduct(data);
    }
}

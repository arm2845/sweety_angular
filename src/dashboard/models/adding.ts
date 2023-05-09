export class Adding {
    id: number;
    name_en?: string;
    name_hy?: string;
    name_ru?: string;
    in_stock: boolean;
    category_id: number;
    category_name: string;
    price: number;
    type: ADDING_TYPES;

    constructor(data: any) {
        this.id = data.id;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
        this.in_stock = data.in_stock;
        this.category_id = data.category_id;
        this.category_name = data.category_name;
        this.price = data.price;
        this.type = data.type;
    }

    static transform(data: any): Adding {
        return new Adding(data);
    }
}

export enum ADDING_TYPES {
    candy = 1,
    adding = 2,
    fruit = 3
}

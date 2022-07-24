export class ProductCategory {
    id: number;
    name_en?: string;
    name_hy?: string;
    name_ru?: string;
    selected?: boolean;
    items: any[];

    constructor(data: any) {
        const mainData = data.data;
        this.id = mainData.id;
        this.name_en = mainData.name_en;
        this.name_hy = mainData.name_hy;
        this.name_ru = mainData.name_ru;
        this.items = mainData.items;
        this.selected = false;
    }
}

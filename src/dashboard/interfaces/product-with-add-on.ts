export interface ProductWithAddOn {
    id: number;
    name_en: string;
    price: number;
    count: number;
    sugar?: number;
    has_sugar?: boolean;
    addings?: number[];
    adding_price: number;
}

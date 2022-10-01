export interface ProductWithAddOn {
    id: number;
    name_en: string;
    price: number;
    count: number;
    sugar?: number;
    addings?: number[];
}

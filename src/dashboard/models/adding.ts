export class Adding {
    id: number;
    name_en?: string;
    name_hy?: string;
    name_ru?: string;

    constructor(data: any) {
        this.id = data.id;
        this.name_en = data.name_en;
        this.name_hy = data.name_hy;
        this.name_ru = data.name_ru;
    }

    static transform(data: any): Adding {
        return new Adding(data);
    }
}

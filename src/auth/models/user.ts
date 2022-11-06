import {UserTypes} from "../constants/user-types";

export class User {
    id: number;
    username: string;
    phone: string;
    role: string;
    type: UserTypes;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.phone = data.phone;
        this.role = data.role;
        this.type = data.type;
    }
}

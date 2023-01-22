import {UserTypes} from "../constants/user-types";
import {Languages} from "../../dashboard/constants/languages";

export class User {
    id: number;
    username: string;
    phone: string;
    role: string;
    lang: Languages;
    type: UserTypes;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.phone = data.phone;
        this.role = data.role;
        this.lang = data.lang;
        this.type = data.type;
    }
}

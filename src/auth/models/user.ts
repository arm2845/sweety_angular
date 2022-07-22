import { Product } from "../../app/models/product";

export class User {
  id: number;
  username: string;
  phone: string;
  role: string;
  cart: Product[];
  favourites: Product[];

  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.phone = data.phone;
    this.role = data.role;
    this.cart = data.cart;
    this.favourites = data.favourites;
  }
}

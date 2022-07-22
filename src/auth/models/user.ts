import { Product } from "../../app/models/product";

export class User {
  id: number;
  name: string;
  phone: string;
  cart: Product[];
  favorites: Product[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.cart = data.cart;
    this.favorites = data.favorites;
  }
}

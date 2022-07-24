import { Product } from "../../dashboard/models/product";

export class Cart {
  items: Product[];
  total_amount: number;
  total_count: number;

  constructor(data: any) {
    this.items = data.items;
    this.total_amount = data.total_amount;
    this.total_count = data.total_count;
  }

  public static transform(data: any): Cart {
    return new Cart(data);
  }
}

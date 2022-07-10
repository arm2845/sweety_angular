export class Product {
  name: string;
  ingredients: string;
  price: number;
  url: string;
  constructor(data: any) {
    this.name = data.name;
    this.ingredients = data.ingredients;
    this.price = data.price;
    this.url = data.url;
  }
}

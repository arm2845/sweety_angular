import { Component, OnInit } from '@angular/core';
import {ProductCategories} from "../../constants/product-categories";
import {ProductCategory} from "../../interfaces/product-category";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product";
import {Products} from "../../constants/products";

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {
  productCategories = ProductCategories;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.setFirstCategoryAsSelected();
    this.products = Products;
  }

  setFirstCategoryAsSelected(): void {
    this.productCategories[0].selected = true;
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          category: this.productCategories[0].id
        },
        queryParamsHandling: 'merge',
        skipLocationChange: true
      }
    )
  }

  selectCategory(category: ProductCategory): void {
    this.productCategories.forEach(item => item.id == category.id ? item.selected = true : item.selected = false);
    this.getItemsByCategory(category.id);
  }

  getItemsByCategory(id: number): void {

  }

}

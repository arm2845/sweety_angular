import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../models/product-category";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuProduct} from "../../models/menu-product";
import {MainService} from "../../services/main.service";
import {tap} from "rxjs";

@Component({
    selector: 'app-menu-nav',
    templateUrl: './menu-nav.component.html',
    styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {
    productCategories: ProductCategory[] = [];
    products: MenuProduct[] = [];
    selectedTab = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mainService: MainService,
    ) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        this.mainService.getCategories().pipe(
            tap((categories: any) => this.productCategories = categories.data),
            tap(() => this.setCategoryAsSelected()),
            tap((categories: any) => this.products = categories.data[0].items),
        )
            .subscribe();
    }

    setCategoryAsSelected(): void {
        const index = this.productCategories.findIndex(category => category.id == this.selectedTab);
        this.productCategories[index].selected = true;
        this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    category: this.productCategories[index].id
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
        const index = this.productCategories.findIndex(category => category.id == id);
        this.products = this.productCategories[index].items;
    }

}

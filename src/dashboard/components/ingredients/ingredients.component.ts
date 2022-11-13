import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {finalize, Subscription, tap} from "rxjs";
import {IngredientsService} from "../../services/ingredients.service";
import {IngredientCategories, IngredientCategoriesData} from "../../constants/ingredient-categories";

@Component({
    selector: 'app-ingredients',
    templateUrl: './ingredients.component.html',
    styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

    ingredients: Ingredient[];
    allIngredients: Ingredient[];
    isLoading = true;
    ingredientCategories = IngredientCategoriesData;
    searchWord = '';
    selectedCategory = 0;

    constructor(
        private ingredientsService: IngredientsService,
    ) {
    }

    ngOnInit(): void {
        this.getIngredients();
    }

    getCategoryName(id: number): string {
        return IngredientCategoriesData.find(item => item.id === id).name;
    }

    changeAvailability(id: number, in_stock: boolean): Subscription {
        const data = {
            in_stock: !in_stock
        }
        return this.ingredientsService.changeAvailability(id, data).pipe(
            tap((res) => this.ingredients.find(item => item.id === res.data.id).in_stock = res.data.in_stock),
        )
            .subscribe();
    }

    openDropdown(): void {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    filterByCategory(category: number): void {
        this.selectedCategory = category;
        this.ingredientCategories.forEach(item => item.selected = item.id === category);
        this.getFilteredAndSearchedData();
        this.closeDropdown();
    }

    search(): void {
        this.getFilteredAndSearchedData();
    }

    private getFilteredAndSearchedData(): void {
        this.ingredients = [];
        this.allIngredients.forEach(item => {
            if (this.simplifyString(item.name_en).includes(this.simplifyString(this.searchWord)) &&
                (this.selectedCategory === IngredientCategories.all || item.category_id === this.selectedCategory)) {
                    this.ingredients.push(item)
            }
        })
    }

    private simplifyString(str: string): string {
        return str.replace(/\s/g,'').toLowerCase();
    }

    private closeDropdown(): void {
        document.getElementById("myDropdown").classList.remove("show");
    }

    private getIngredients(): Subscription {
        return this.ingredientsService.getIngredients().pipe(
            tap((res) => this.ingredients = res.data),
            tap((res) => this.allIngredients = res.data),
            finalize(() => this.isLoading = false),
        )
            .subscribe();
    }

}

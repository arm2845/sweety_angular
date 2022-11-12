import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {finalize, Subscription, tap} from "rxjs";
import {IngredientsService} from "../../services/ingredients.service";
import {IngredientCategoriesData} from "../../constants/ingredient-categories";

@Component({
    selector: 'app-ingredients',
    templateUrl: './ingredients.component.html',
    styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {

    ingredients: Ingredient[];
    isLoading = true;

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

    private getIngredients(): Subscription {
        return this.ingredientsService.getIngredients().pipe(
            tap((res) => this.ingredients = res.data),
            finalize(() => this.isLoading = false),
        )
            .subscribe();
    }

}

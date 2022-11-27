export enum IngredientCategories {
    all = 0,
    fruit = 1,
    coffee = 2,
    tea = 3,
    other = 4,
}

export const IngredientCategoriesData = [
    {
        id: IngredientCategories.all,
        name: 'INGREDIENTS.CATEGORIES.ALL',
        selected: true,
    },
    {
        id: IngredientCategories.fruit,
        name: 'INGREDIENTS.CATEGORIES.FRUIT',
        selected: false,
    },
    {
        id: IngredientCategories.coffee,
        name: 'INGREDIENTS.CATEGORIES.COFFEE',
        selected: false,
    },
    {
        id: IngredientCategories.tea,
        name: 'INGREDIENTS.CATEGORIES.TEA',
        selected: false,
    },
    {
        id: IngredientCategories.other,
        name: 'INGREDIENTS.CATEGORIES.OTHER',
        selected: false,
    },
]

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
        name: 'all',
        selected: true,
    },
    {
        id: IngredientCategories.fruit,
        name: 'fruit',
        selected: false,
    },
    {
        id: IngredientCategories.coffee,
        name: 'coffee',
        selected: false,
    },
    {
        id: IngredientCategories.tea,
        name: 'tea',
        selected: false,
    },
    {
        id: IngredientCategories.other,
        name: 'other',
        selected: false,
    },
]

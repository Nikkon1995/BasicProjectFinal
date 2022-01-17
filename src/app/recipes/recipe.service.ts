import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipeChanged = new Subject<Recipe []>();
    recipeSelected = new Subject<Recipe>();
    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzel', 
    //     'A super tasty Schnitzel - Just Awesome', 
    //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French Fries',20)
    //     ]),
    //     new Recipe('Big Fat Burger', 
    //     'What more do you need to say?', 
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Burger_King_Big_King_XXL_Menu.jpg/800px-Burger_King_Big_King_XXL_Menu.jpg',
    //     [
    //         new Ingredient('Buns',2),
    //         new Ingredient('Meat',1)
    //     ])
    //   ];
    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService) {}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
    
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsToSLFromRecipe(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
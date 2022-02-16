import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions" 
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer"
import * as fromApp from "../store/app.reducer";
@Injectable({providedIn: 'root'})
export class RecipeService {
    recipeChanged = new Subject<Recipe []>();
    recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [];
    constructor(
        private slService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) {}
    
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
        //this.slService.addIngredientsToSLFromRecipe(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
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
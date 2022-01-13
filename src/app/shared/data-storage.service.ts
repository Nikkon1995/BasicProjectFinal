import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const allRecipes = this.recipesService.getRecipes();
        this.http.
        put('https://ng-recipe-book-18da8-default-rtdb.firebaseio.com/recipes.json', allRecipes)
        .subscribe((response)=> {
            console.log(response);
        })
    }

    fetchRecipes() {
        this.http.
        get<Recipe []>('https://ng-recipe-book-18da8-default-rtdb.firebaseio.com/recipes.json')
        .subscribe((response) => {
            this.recipesService.setRecipes(response);
        })
    }
}
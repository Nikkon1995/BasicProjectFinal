import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const allRecipes = this.recipesService.getRecipes();
        this.http.
            put('https://ng-recipe-book-18da8-default-rtdb.firebaseio.com/recipes.json', allRecipes)
            .subscribe((response) => {
                console.log(response);
            })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://ng-recipe-book-18da8-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipes => {
                        return { ...recipes, ingredients: recipes.ingredients ? recipes.ingredients : [] }
                    });
                }),
                catchError(error => { throw 'No objects to display' + error }),
                tap(recipes => {
                    if (recipes) {
                        this.recipesService.setRecipes(recipes);
                    }
                })
            )
    }
}
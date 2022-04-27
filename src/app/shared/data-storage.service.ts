import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipesService: RecipeService, 
        private store: Store<fromApp.AppState>) { }

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
                    // if (recipes) {
                    //     this.recipesService.setRecipes(recipes);
                    // }
                    this.store.dispatch(new RecipesActions.SetRecipes(recipes));
                })
            )
    }
}
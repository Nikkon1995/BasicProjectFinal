import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class RecipesEffect {
    constructor(
        private action$: Actions,
        private http: HttpClient
    ) {}
}
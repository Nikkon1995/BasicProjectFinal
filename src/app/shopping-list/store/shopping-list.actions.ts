import { Action } from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
    constructor(public payload?: undefined) {}
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class StartEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload?: undefined) {}
}

export type ShoppingListActions = 
| AddIngredient 
| AddIngredients 
| DeleteIngredient 
| UpdateIngredient
| StartEdit
| StopEdit
import { Action } from "@ngrx/store";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type: string = LOGIN;

    constructor(public payload: {
        email: string,
        userId: string,
        token: string,
        expirationdate: Date;
    }) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;

    constructor(public payload?: undefined) {}
}

export type AuthActions = Login | Logout;
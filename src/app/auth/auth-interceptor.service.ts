import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer"

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return this.authService.user.pipe(
            return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                } else {
                    const modifiedReq = req.clone({
                        params: new HttpParams().set('auth', user._token),
                        // headers: new HttpHeaders({'xyz': 'abc'})
                    })
                    return next.handle(modifiedReq);
                }
            })
        )
    }
}
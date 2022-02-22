import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) { }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        })
    }

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closedSub: Subscription;
    private storeSub: Subscription;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        console.log(this.isLoginMode);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        // let authObs: Observable<AuthResponseData>;
        this.isLoading = true
        if (this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(
                new AuthActions.LoginStart({ email: email, password: password })
            );
        } else {
            // authObs = this.authService.signUp(email, password);
            this.store.dispatch(
                new AuthActions.SignupStart({email: email, password: password})
            )
        }


        // authObs.subscribe(resData => {
        //     console.log(resData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // },
        //     errorMessage => {
        //         console.log(errorMessage);
        //         this.error = errorMessage;
        //         // this.showErrorAlert(errorMessage) => Used for manually creating component
        //         this.isLoading = false;
        //     });

        form.reset();
    }

    onHandleError() {
        // this.error = null;
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy(): void {
        if (this.closedSub) {
            this.closedSub.unsubscribe();
        }
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        // const alertCmp = new AlertComponent();
        const alertComponentFactory = this.componentFactoryResolver
            .resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const compRef = hostViewContainerRef.createComponent(alertComponentFactory);

        compRef.instance.message = message;
        this.closedSub = compRef.instance.close.subscribe(() => {
            this.closedSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
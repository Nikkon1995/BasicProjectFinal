import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closedSub: Subscription;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                // this.showErrorAlert(errorMessage) => Used for manually creating component
                this.isLoading = false;
            });

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if (this.closedSub) {
            this.closedSub.unsubscribe();
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
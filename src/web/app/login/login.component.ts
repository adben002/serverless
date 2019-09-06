import {Component, OnInit}        from '@angular/core';
import {
    Router,
    NavigationExtras
} from '@angular/router';
import {AuthService}      from '../auth/auth.service';
import {UserDetails}      from './user-details';

@Component({
    template: `
        <h2>LOGIN</h2>

        <div>
            <input type="text" id="name" class="form-control"
                   required minlength="1"
                   name="username" [(ngModel)]="user.username"
                   #username="ngModel">
        </div>

        <div>
            <input type="password" id="password" class="form-control"
                   required minlength="1"
                   name="password" [(ngModel)]="user.password"
                   #password="ngModel">
        </div>

        <p>{{message}}</p>
        <p>
            <button (click)="login()" *ngIf="!authService.isLoggedInObs.getValue()">Login</button>
        </p>`
})
export class LoginComponent implements OnInit {

    private static readonly navigationExtras: NavigationExtras = {
        preserveQueryParams: true,
        preserveFragment: true
    };

    message: string = '';
    user: UserDetails = new UserDetails('', '');

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.authService.isLoggedInObs.subscribe(
            (isLoggedIn) => {
                if (isLoggedIn) {
                    let redirectUrl: string = this.authService.redirectUrl == null ? '' : this.authService.redirectUrl;

                    // Redirect the user
                    this.router
                        .navigate([redirectUrl], LoginComponent.navigationExtras)
                        .catch((err) => console.error(err));
                }
                this.message = '';
            },
            (error) => console.error(error)
        );
    }

    login(): void {
        this.message = 'Trying to log in ...';

        this.authService.login(this.user);
    }

}

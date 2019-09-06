import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './auth/auth.service';

@Component({
    selector: 'my-app',
    template: `
        <div>
            <span>
                <h1 class="title">Bacon Order</h1>
            </span>
            <span>
                <button (click)="logout()" *ngIf="authService.isLoggedInObs.getValue()">Logout</button>
            </span>
            <div>
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class AppComponent {

    constructor(public authService: AuthService, public router: Router) {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']).catch((err) => console.error(err));
    }

}

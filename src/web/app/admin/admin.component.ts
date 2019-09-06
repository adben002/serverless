import {Component} from '@angular/core';

@Component({
    template: `
        <h3>ADMIN</h3>
        <nav>
            <a routerLink="./" routerLinkActive="active">Manage order</a>
            <a routerLink="./order" routerLinkActive="active">Manage form</a>
            <a routerLink="./admins" routerLinkActive="active">Manage admins</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AdminComponent {
}

import { Component } from "@angular/core";

@Component({
  template: `
        <nav>
            <a routerLink="" routerLinkActive="active">Order</a>
            <a routerLink="./admin" routerLinkActive="active">Admin</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class MainComponent {}

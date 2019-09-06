import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent}    from './not-found.component';

import {CanDeactivateGuard}       from './auth/can-deactivate-guard.service';
import {AuthGuard}                from './auth/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/main.module#MainModule',
        canLoad: [AuthGuard]
    },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard
    ]
})
export class AppRoutingModule {
}

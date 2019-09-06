import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent}           from './main.component';

import {AuthGuard}                from '../auth/auth-guard.service';

const mainRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {path: '', loadChildren: '../order/order.module#OrderModule'},
                    {path: 'admin', loadChildren: '../admin/admin.module#AdminModule'}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {
}

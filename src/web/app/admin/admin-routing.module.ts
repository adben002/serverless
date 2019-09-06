import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../auth/auth-guard.service';
import {AdminComponent} from './admin.component';
import {AdminOrderResultsComponent} from './admin-order-results.component';
import {AdminOrderFormComponent} from './admin-order-form.component';
import {AdminManageAdminsComponent} from './admin-manage-admins.component';


const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    {path: 'order', component: AdminOrderFormComponent},
                    {path: 'admins', component: AdminManageAdminsComponent},
                    {path: '', component: AdminOrderResultsComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}

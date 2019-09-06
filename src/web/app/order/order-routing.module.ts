import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent }           from './order.component';

import { AuthGuard }                from '../auth/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [AuthGuard]
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
export class OrderRoutingModule {}

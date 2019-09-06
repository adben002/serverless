import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AdminComponent} from './admin.component';
import {AdminOrderResultsComponent} from './admin-order-results.component';
import {AdminOrderFormComponent} from './admin-order-form.component';
import {AdminManageAdminsComponent} from './admin-manage-admins.component';

import {AdminRoutingModule} from './admin-routing.module';
import {ListBoxComponent} from '../common/list-box.component';
import {OrderService} from '../order/order.service';
import {HttpHelper} from '../common/http.helper';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AdminComponent,
        AdminOrderResultsComponent,
        AdminOrderFormComponent,
        AdminManageAdminsComponent,
        ListBoxComponent
    ],
    providers: [
        OrderService,
        HttpHelper
    ]
})
export class AdminModule {
}

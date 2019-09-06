import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';

import {OrderComponent}           from './order.component';

import {OrderRoutingModule}       from './order-routing.module';
import {HttpModule} from '@angular/http';
import {OrderService} from './order.service';
import {HttpHelper} from '../common/http.helper';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        HttpModule
    ],
    declarations: [
        OrderComponent
    ],
    providers: [
        OrderService,
        HttpHelper
    ]
})
export class OrderModule {
}

import {Component, OnInit} from '@angular/core';
import {OrderDetails, Order} from './order-form';
import {OrderService} from '../order/order.service';
import {Http} from '@angular/http';
import {HttpHelper} from '../common/http.helper';

@Component({
    template: `
        <p>Manage orders</p>

        <div *ngFor="let order of orderDetails.orderValues">
            <span>
                <input type="text" [(ngModel)]="order.key">
            </span>
            <span>
                <list-box [values]="order.values"></list-box>
            </span>
        </div>

        <button (click)="addNewOrderValue()">Add form value</button>
        <button (click)="updateOrder()">Update</button>
    `
})
export class AdminOrderFormComponent implements OnInit {

    private orderDetails: OrderDetails = new OrderDetails(new Array<Order>(new Order('', [])));

    constructor(private orderService: OrderService, private http: Http, private httpHelper: HttpHelper) {
    }

    ngOnInit(): void {
        this.orderService.orderValues
            .subscribe(
                (resp) => this.orderDetails = JSON.parse(resp.text()),
                (err) => console.error(err));
    }

    addNewOrderValue(): void {
        this.orderDetails.orderValues.push(new Order('', []));
    }

    updateOrder(): void {
        this.http.post('/api/updateorder', this.orderDetails, this.httpHelper.headerValue)
            .subscribe((resp) => console.log(resp),
                (error) => console.error(error));

    }

}

import {Component, OnInit} from '@angular/core';
import {OrderDetails} from '../admin/order-form';
import {Response} from '@angular/http';
import {OrderService} from './order.service';
import * as AWSIot from 'aws-iot-device-sdk';
import * as AWS from 'aws-sdk';


@Component({
    template: `
        <h3>Order</h3>

        <div *ngFor="let order of orderDetails?.orderValues">
            <label>
                {{order.key}}
            </label>
            <p>
                <select>
                    <option *ngFor="let opt of order.values" [value]="opt">
                        {{opt}}
                    </option>
                </select>
            </p>
            <br/>
        </div>
    `
})
export class OrderComponent implements OnInit {

    orderDetails: OrderDetails;

    private static parseOrderDetails(resp: Response): OrderDetails {
        return JSON.parse(resp.text());
    }

    constructor(private orderService: OrderService) {


    }

    ngOnInit(): void {
        this.orderService.orderValues.subscribe(
            (resp) => this.orderDetails = OrderComponent.parseOrderDetails(resp),
            (error) => console.error(error));
    }

}

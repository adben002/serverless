import {Injectable} from '@angular/core';
import {Http, Response}          from '@angular/http';
import {HttpHelper} from '../common/http.helper';
import {Observable} from 'rxjs/Observable';
import * as AWSIot from 'aws-iot-device-sdk';
import * as AWS from 'aws-sdk';

const IoT = new AWS.Iot();

@Injectable()
export class OrderService {

    constructor(private http: Http, private httpHelper: HttpHelper) {
    }

    get orderValues(): Observable<Response> {
        return this.http.get('/api/test', this.httpHelper.headerValue);
    }

}

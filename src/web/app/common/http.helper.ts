import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Http, Headers, RequestOptions, RequestOptionsArgs}          from '@angular/http';

@Injectable()
export class HttpHelper {

    constructor(private http: Http, private authService: AuthService) {
    }

    public get headerValue(): RequestOptions {
        let headers: Headers = new Headers({
            'authorizationToken': this.authService.accessToken
        });
        let args: RequestOptionsArgs = {
            headers: headers
        };
        return new RequestOptions(args);
    }

}

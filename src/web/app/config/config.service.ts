import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ConfigService {

    private config: Object = null;

    constructor(private http: Http) {
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    public load(): Promise<Object> {
        return new Promise((resolve) => {
            this.http.get('/api/config').map( res => res.json() ).catch((error: any):any => {
                console.log('Configuration file could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((envResponse) => {
                this.config = envResponse;
                resolve(true);
            });
        });
    }

}

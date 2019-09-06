import {APP_INITIALIZER, NgModule}       from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import {AppComponent}            from './app.component';
import {AppRoutingModule}        from './app-routing.module';

import {LoginRoutingModule}      from './login/login-routing.module';
import {LoginComponent}          from './login/login.component';
import {PageNotFoundComponent}   from './not-found.component';
import {ConfigService} from "./config/config.service";
import {HttpModule} from "@angular/http";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        LoginRoutingModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    providers: [
        ConfigService,
        { provide: APP_INITIALIZER, useFactory: (config: ConfigService) => () => config.load(), deps: [ConfigService], multi: true },
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

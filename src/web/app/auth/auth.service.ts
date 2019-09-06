import {Injectable} from '@angular/core';

import * as AWS from 'aws-sdk';
import * as AWSCognito from 'amazon-cognito-identity-js';

import {UserDetails} from '../login/user-details';
import {BehaviorSubject} from 'rxjs';
import {ConfigService} from "../config/config.service";

@Injectable()
export class AuthService {

    isLoggedInObs: BehaviorSubject<boolean> = new BehaviorSubject(false);

    accessToken: string = '';

    // store the URL so we can redirect after logging in
    redirectUrl: string = '';

    constructor(private configService: ConfigService) {
        AWS.config.update({region: this.configService.getConfig('region')});

        let cognitoUser: AWSCognito.CognitoUser = this.getUserPool().getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err: any, session: any) => {
                if (err) {
                    this.isLoggedInObs.next(false);
                    return;
                }

                this.setCredentials(session.getIdToken().getJwtToken(), session.getAccessToken().getJwtToken());

                let refreshFailed = false;
                (<AWS.CognitoIdentityCredentials>AWS.config.credentials).refresh((error) => {
                    if (error) {
                        refreshFailed = true;
                        console.error(error);
                    }
                });
                if (refreshFailed) {
                    this.isLoggedInObs.next(false);
                    return;
                }

                this.isLoggedInObs.next(true);
            });

        }
    }

    private getUserPool(): AWSCognito.CognitoUserPool {
        let poolData: AWSCognito.ICognitoUserPoolData = {
            UserPoolId: this.configService.getConfig('userPoolId'), // Your user pool id here
            ClientId: this.configService.getConfig('clientId') // Your client id here
        };
        return new AWSCognito.CognitoUserPool(poolData);
    }

    login(user: UserDetails): void {
        let authenticationData: AWSCognito.IAuthenticationDetailsData = {
            Username: user.username,
            Password: user.password,
        };
        let authenticationDetails: AWSCognito.AuthenticationDetails =
            new AWSCognito.AuthenticationDetails(authenticationData);
        let userData: AWSCognito.ICognitoUserData = {
            Username: user.username,
            Pool: this.getUserPool()
        };
        let cognitoUser: AWSCognito.CognitoUser = new AWSCognito.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session: AWSCognito.CognitoUserSession) => {

                this.setCredentials(session.getIdToken().getJwtToken(), session.getAccessToken().getJwtToken());

                this.isLoggedInObs.next(true);
            },

            onFailure: (err: any) => {
                console.error(err);
                this.isLoggedInObs.next(false);
            },

        });
    }

    logout(): void {
        (<AWS.CognitoIdentityCredentials>AWS.config.credentials).clearCachedId();
        this.getUserPool().getCurrentUser().signOut();
        this.isLoggedInObs.next(false);
    }


    private setCredentials(jwtIdToken: string, jwtAccessToken: string): void {
        let logins: any = {};
        logins[this.configService.getConfig('cognitoLogin')] = jwtIdToken;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: this.configService.getConfig('identityPoolId'), // your identity pool id here
            Logins: logins
        });

        this.accessToken = jwtAccessToken;
    }

}

import { Injectable, NgZone } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { FacebookService } from 'ng2-facebook-sdk';

declare let gapi: any;

import 'rxjs/add/operator/map'

@Injectable()

export class AuthenticationService {
    public token: string;

    constructor(
        private http: Http,
        private fb: FacebookService
    ) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string, facebook: string, google: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://api.appcar.com.ar:2080/wsLogin', JSON.stringify({ email: email, password: password, facebook: facebook, google: google }), options)
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                let statusCode = response.json().code;

                if (token) {
                    this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                    return true;
                } else {
                    return false;
                }
            })
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.token = null;
        this.fb.getLoginStatus().then(
            response => {
                let status = response.status;
                if (status === 'connected') {
                    this.fb.logout();
                }
            }
        );

        let googleLoginStatus = gapi.auth2;

        if (googleLoginStatus) {
            let auth2 = googleLoginStatus.getAuthInstance();
            auth2.signOut();
        }

        location.reload();
    }

}
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

declare let FB: any;

@Injectable()

export class SignupService {

    constructor(
        private http: Http
        // , private data: any
    ) {
        this.facebookInit();
        // this.data = new Observable(observer => {
        //     FB.getLoginStatus(function(response) {
        //         if (response.status === 'connected') {
        //             console.log('Logged in.');
        //         }
        //         else {
        //             FB.login();
        //             console.log('Abriendo ventana.');
        //         }
        //     });
        // })
    }

    facebookInit() {
        FB.init({
            appId: '1820396898212790',
            xfbml: true,
            version: 'v2.8'
        })
        console.log(FB);
    }

    facebookSignIn() {
        // this.data.suscribe(
        //     value => console.log(value),
        //     err => console.log(err),
        //     () => console.log('Listo')
        // )
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
            }
            else {
                FB.login();
                console.log('Abriendo ventana.');
            }
        });
    }
}
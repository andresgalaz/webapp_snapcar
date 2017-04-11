import { Component, Injectable, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { SignupService } from '../signup.service';

declare let FB: any;
declare var gapi: any;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
    facebookAccessToken: string = null;
    googleAccessToken: string = null;
    userEmail: string = null;
    userName: string = null;
    userBirthday: string = null;
    userPassword: string = null;
    userDNI: string = null;
    userImage: string = null;
    token: string = null;

    constructor(
        private ngZone: NgZone,
        private http: Http,
        private signUpService: SignupService
    ) {
        this.facebookInit();
        window['onSignIn'] = (user) => ngZone.run(() => this.googleSignUp(user));
    }

    // Inicializa Facebook API
    facebookInit() {
        FB.init({
            appId: '1820396898212790',
            xfbml: true,
            version: 'v2.8'
        })
    }

    // Obtener datos de Facebook para el registro
    // ToDo: Autorizar obtención de fecha de nacimiento
    facebookSignUp() {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log('Ya está conectado.');
            }
            else {
                FB.login(function (response) {
                    if (response.status === 'connected') {
                        this.facebookAccessToken = response.authResponse.accessToken;

                        FB.api('me', { fields: 'email, name, picture' }, function (response) {
                            this.userEmail = response.email;
                            this.userName = response.name;
                            this.userImage = response.picture.data.url;

                            this.signUpService
                                .signUp(response.email, '', response.name, '', '', '', response.picture.data.url)
                                .suscribe(
                                    result => {
                                        console.log(result);
                                    },
                                    error => {
                                        console.log(error);
                                    }
                                )
                        })
                    } else {
                        console.log('Debe autorizar la aplicación para poder registrarse.');
                    }
                }, { scope: 'public_profile, email' });
            }
        });
    }

    // Obtener datos de Google para el registro
    googleSignUp(googleUser): void {
        let userProfile = googleUser.getBasicProfile();

        if (userProfile) {
            this.googleAccessToken = googleUser.getAuthResponse().id_token;
            this.userEmail = userProfile.getEmail();
            this.userName = userProfile.getName();
            this.userImage = userProfile.getImageUrl();
        } else {
            console.log('Debe autorizar la aplicación para poder registrarse.');
        }
    }

    // Obtener datos desde el formulario
    formSignUp(form: NgForm) {

    }
}
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

// declare let FB: any;
// declare var gapi: any;

@Injectable()

export class SignupService {
    public token: string;

    // facebookAccessToken: string = null;
    // googleAccessToken: string = null;
    // userEmail: string = null;
    // userName: string = null;
    // userBirthday: string = null;
    // userPassword: string = null;
    // userDNI: string = null;
    // userImage: string = null;
    // token: string = null;

    constructor(
        // private ngZone: NgZone,
        private http: Http
    ) {
        // this.facebookInit();
        // window['onSignIn'] = (user) => ngZone.run(() => this.googleSignUp(user));
    }

    // Inicializa Facebook API
    // facebookInit() {
    //     FB.init({
    //         appId: '1820396898212790',
    //         xfbml: true,
    //         version: 'v2.8'
    //     })
    // }

    // Obtener datos de Facebook para el registro
    // ToDo: Autorizar obtención de fecha de nacimiento
    // facebookSignUp() {
    //     FB.getLoginStatus(function (response) {
    //         if (response.status === 'connected') {
    //             console.log('Ya está conectado.');
    //         }
    //         else {
    //             FB.login(function (response) {
    //                 if (response.status === 'connected') {
    //                     this.facebookAccessToken = response.authResponse.accessToken;

    //                     FB.api('me', { fields: 'email, name, picture' }, function (response) {
    //                         this.userEmail = response.email;
    //                         this.userName = response.name;
    //                         this.userImage = response.picture.data.url;
    //                     })
    //                 } else {
    //                     console.log('Debe autorizar la aplicación para poder registrarse.');
    //                 }
    //             }, { scope: 'public_profile, email' });
    //         }
    //     });
    // }

    // Obtener datos de Google para el registro
    // googleSignUp(googleUser): void {
    //     let userProfile = googleUser.getBasicProfile();

    //     if (userProfile) {
    //         this.googleAccessToken = googleUser.getAuthResponse().id_token;
    //         this.userEmail = userProfile.getEmail();
    //         this.userName = userProfile.getName();
    //         this.userImage = userProfile.getImageUrl();
    //     } else {
    //         console.log('Debe autorizar la aplicación para poder registrarse.');
    //     }
    // }

    // Obtener datos desde el formulario
    // formSignUp(form: NgForm) {

    // }

    // Servicio de registro
    signUp(
        email: string,
        password: string,
        name: string,
        dni: string,
        gender: string,
        birthday: string,
        image: string
    ): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://api.appcar.com.ar:2080/wsRegistro', JSON.stringify({ email: email, password: password, name: name, dni: dni, gender: gender, birthday: birthday }), options)
            .map((response: Response) => {
                let token = response.json() && response.json().token;

                if (token) {
                    this.token = token;

                    localStorage.setItem('currentUser', JSON.stringify({ email: email, name: name, image: image, token: token }));

                    return true;
                } else {
                    return false;
                }
            })
    }
}
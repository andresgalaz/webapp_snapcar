import { Component, OnInit, NgZone, EventEmitter, style, animate, transition, trigger } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookLoginStatus } from 'ng2-facebook-sdk';
import { MaterializeAction } from 'angular2-materialize';

declare var gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ]),
            transition('* => void', [
                animate(500, style({ opacity: 0 }))
            ])
        ])
    ]
})

export class LoginComponent implements OnInit {
    error: string = '';
    loading: boolean = false;
    facebook: string = '';
    facebookStatus: string = '';
    facebookAccessToken: string = '';
    google: string = '';
    modalActions = new EventEmitter<string | MaterializeAction>();

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private fb: FacebookService,
        private ngZone: NgZone
    ) {
        let fbParams: FacebookInitParams = {
            appId: '1820396898212790',
            xfbml: true,
            version: 'v2.8'
        };
        this.fb.init(fbParams);
        window['onSignIn'] = (user) => ngZone.run(() => this.googleLogin(user));
    }

    ngOnInit() {
        //this.authenticationService.logout();
    }

    ngAfterViewInit() { }

    // Standard Login
    login(form: NgForm) {
        this.loading = true;
        this.authenticationService
            .login(form.value.email, form.value.password, this.facebook, this.google)
            .subscribe(
            result => {
                if (result === true) {
                    this.router.navigate(['/']);
                }
            },
            error => {
                if (error.status === 401) {
                    this.error = 'Email o contraseña inválida';
                    this.loading = false;
                }
            })
    }

    // Google Login
    googleLogin(googleUser):void {
        this.loading = true;
        let profile = googleUser.getBasicProfile();
        let idToken = googleUser.getAuthResponse().id_token;

        if (idToken) {
            this.authenticationService
                .login(profile.getEmail(), '', '', idToken)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigate(['/']);
                        }
                    },
                    error => {
                        if (error.status === 401) {
                            this.error = 'No es posible acceder mediante Google';
                            this.loading = false;
                        }
                    }
                )
        }

    }

    // Facebook Login
    facebookLogin(): void {
        this.loading = true;
        this.fb.getLoginStatus().then(
            (response: FacebookLoginStatus) => {
                this.facebookStatus = response.status;
                if (this.facebookStatus !== 'connected') {
                    this.fb.login({
                        return_scopes: true,
                        scope: 'public_profile,email'
                    }).then(
                        (response: FacebookLoginResponse) => {
                            if (response.authResponse.grantedScopes.indexOf('email') >= 0) {
                                this.facebookAccessToken = response.authResponse.accessToken;
                                this.fb.api('me?fields=email,name,gender,picture,cover', 'get')
                                    .then(response => {
                                        this.authenticationService
                                            .login(response.email, '', this.facebookAccessToken, '')
                                            .subscribe(
                                                result => {
                                                    if (result) {
                                                        this.router.navigate(['/']);
                                                    }
                                                },
                                                error => {
                                                    console.log(error);
                                                    if (error.status === 401) {
                                                        this.error = 'No es posible acceder mediante Facebook';
                                                        this.loading = false;
                                                    }
                                                })
                                    });
                            } else {
                                this.error = 'Debes proporcionar email';
                            }
                        },
                        (error: any) => {
                            console.log(error);
                            this.loading = false;
                        }
                    )}
            },
            (error: any) => console.error(error)
        )}

    openModal() {
        this.modalActions.emit({
            action: "modal",
            params: ['open']
        });
    }

    closeModal() {
        this.modalActions.emit({
            action: "modal",
            params: ['close']
        });
    }
}
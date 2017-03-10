import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, FacebookLoginResponse, FacebookInitParams, FacebookLoginStatus } from 'ng2-facebook-sdk';
import { AuthenticationService } from '../authentication.service';
import { SignupService } from '../signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
    error: string = '';
    loading: boolean = false;
    facebook: string = '';
    facebookStatus: string = '';
    facebookAccessToken: string = '';

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private signUpService: SignupService
        // private fb: FacebookService,
        // private signUpService: SignupService
    ) {
        // let fbParams: FacebookInitParams = {
        //     appId: '1820396898212790',
        //     xfbml: true,
        //     version: 'v2.8'
        // };
        // this.fb.init(fbParams);
    }

    ngOnInit() { }

    facebookTestLogin() {
        this.signUpService.facebookSignIn();
    }

// facebookLogin(): void {
//         this.loading = true;
//         this.fb.getLoginStatus().then(
//             (response: FacebookLoginStatus) => {
//                 this.facebookStatus = response.status;
//                 if (this.facebookStatus !== 'connected') {
//                     this.fb.login({
//                         return_scopes: true,
//                         scope: 'public_profile,email'
//                     }).then(
//                         (response: FacebookLoginResponse) => {
//                             if (response.authResponse.grantedScopes.indexOf('email') >= 0) {
//                                 this.facebookAccessToken = response.authResponse.accessToken;
//                                 this.fb.api('me?fields=email,name,gender,picture,cover', 'get')
//                                     .then(response => {
//                                         this.authenticationService
//                                             .login(response.email, '', this.facebookAccessToken, '')
//                                             .subscribe(
//                                                 result => {
//                                                     if (result) {
//                                                         this.router.navigate(['/']);
//                                                     }
//                                                 },
//                                                 error => {
//                                                     console.log(error);
//                                                     if (error.status === 401) {
//                                                         this.error = 'No es posible acceder mediante Facebook';
//                                                         this.loading = false;
//                                                     }
//                                                 })
//                                     });
//                             } else {
//                                 this.error = 'Debes proporcionar email';
//                             }
//                         },
//                         (error: any) => {
//                             console.log(error);
//                             this.loading = false;
//                         }
//                     )}
//             },
//             (error: any) => console.error(error)
//         )}

}

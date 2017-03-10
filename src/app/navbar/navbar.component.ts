import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    notifications: number;

    // @Output() open: EventEmitter<any> = new EventEmitter();
    modalActions = new EventEmitter<string | MaterializeAction>();

    constructor(
        private authenticationService: AuthenticationService,
    ) {
        this.notifications = 3;
    }

    ngOnInit() { }

    logout() {
        this.authenticationService.logout();
    }

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
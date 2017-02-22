import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    notifications: number;
    
    @Output() open: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.notifications = 3;
    }

    ngOnInit() {
    }

}

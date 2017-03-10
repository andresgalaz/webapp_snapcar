import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {
    data: any;
    path: any;

    constructor(route: ActivatedRoute, router: Router) {
        if (route.children.length > 0) {
            this.data = '';
        } else {
            this.data = route.snapshot.data;
            this.path = router.url;
        }
        console.log(route);
        console.log(router);
    }

    ngOnInit() {
    }

}
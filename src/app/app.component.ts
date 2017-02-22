import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    // lat: number;
    // lng: number;
    // title: string;
    // breadcrumbMap: string[];

    // @ViewChild('breadcrumb', { read: ViewContainerRef })
    // breadcrumb: ViewContainerRef;

    // constructor (private componentFactoryResolver: ComponentFactoryResolver) {
    //     this.lat = 51.678418;
    //     this.lng = 7.809007;
    //     this.title = 'Mis viajes';
    //     this.breadcrumbMap = ['Home', 'Mis viajes'];
    // }

    // ngOnInit () {
    //     const scoreGauge = this.componentFactoryResolver.resolveComponentFactory(BreadcrumbComponent);
    //     let breadcrumb = this.breadcrumb.createComponent(scoreGauge);
    //     breadcrumb.instance.title = this.title;
    //     breadcrumb.instance.breadcrumbMap = this.breadcrumbMap;
    // }

    constructor () {}

    ngOnInit () {}
}

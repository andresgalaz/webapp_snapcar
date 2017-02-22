import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { GaugeComponent } from '../gauge/gauge.component';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    userBackground: string;
    userImage: string;
    userName: string;
    userEmail: string;
    siniestrosActivos: number;

    @ViewChild('gaugeContainer', { read: ViewContainerRef })
    gaugeContainer: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        this.userBackground = 'assets/img/bg.jpg';
        this.userImage = 'assets/img/profile-image.jpg';
        this.userName = 'Juan Perez';
        this.userEmail = 'juanperez@gmail.com';
        this.siniestrosActivos = 1;
    }

    loadGauger() {
        const scoreGauge = this.componentFactoryResolver.resolveComponentFactory(GaugeComponent);
        this.gaugeContainer.createComponent(scoreGauge);
    }

    ngOnInit() {
    }

}

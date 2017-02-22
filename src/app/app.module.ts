import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ChartsModule } from 'ng2-charts';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { GaugeComponent } from './gauge/gauge.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidenavComponent,
        GaugeComponent,
        BreadcrumbComponent,
        LoginComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Routing,
        MaterializeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD-_RKvMaf4ZBu4Ji8EvaTC5WVu1FGp23w'
        }),
        ChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [BreadcrumbComponent, GaugeComponent]
})
export class AppModule { }

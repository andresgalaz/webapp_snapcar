import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { title: 'Home' },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { title: 'Dashboard' }
            },
            {
                path: 'viajes',
                component: DashboardComponent,
                data: { title: 'Mis Viajes' }
            }
        ]
    },
    { path: '**', redirectTo: 'home' }
]

export const Routing = RouterModule.forRoot(appRoutes);
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: 'login',
      component: LoginComponent,
      data: { title: '', breadcrumb: '' }
    },
    { path: 'dashboard',
      component: DashboardComponent,
      data: { title: '', breadcrumb: '' }
    },
    { path: '**', redirectTo: '' }
]

export const Routing = RouterModule.forRoot(appRoutes);
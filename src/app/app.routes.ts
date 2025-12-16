import { Routes } from '@angular/router';
import { loginPageComponent } from './pages/logIn/login.component';
import { signUpPageComponent } from './pages/singUp/singup.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        component: loginPageComponent
    },
    {
        path:'signup',
        component: signUpPageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {path: '**', redirectTo: ''}
];

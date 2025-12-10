import { Routes } from '@angular/router';
import { loginPageComponent } from './pages/logIn/login.component';
import { signUpPageComponent } from './pages/singUp/singup.component';

export const routes: Routes = [
    {
        path:'',
        component: loginPageComponent
    },
    {
        path:'signup',
        component: signUpPageComponent
    },
];

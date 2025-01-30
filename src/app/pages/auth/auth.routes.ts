import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { Login } from './login';

export default [
    { path: '', component: Login },
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login }
] as Routes;

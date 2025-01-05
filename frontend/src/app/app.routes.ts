import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/modules/login-form/login-form.component';
import { HomeComponent } from './components/modules/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  }
];

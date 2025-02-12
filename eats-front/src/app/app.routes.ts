import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {loginGuard} from './pages/login/login.guard';
import {LoginComponent} from './pages/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {DemandComponent} from './pages/demand/demand.component';
import { QuiosqueComponent } from './pages/quiosque/quiosque.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pedido', component: DemandComponent },
  { path: 'quiosque', component: QuiosqueComponent},

];

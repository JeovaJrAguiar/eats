import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {loginGuard} from './pages/login/login.guard';
import {LoginComponent} from './pages/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {DemandComponent} from './pages/demand/demand.component';
import {QuiosqueComponent} from './pages/quiosque/quiosque.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {OrderComponent} from './pages/order/order.component';
import {CarrinhoComponent} from './pages/carrinho/carrinho.component';
import {SigninComponent} from './pages/signin/signin.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import { Component } from '@angular/core';
import {CheckinComponent} from './pages/checkin/checkin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'registro', component: SigninComponent },
  { path: 'quiosque', component: QuiosqueComponent },
  { path: 'pedido', component: OrderComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'categorias', component: CategoriesComponent },
  { path: 'promocoes', component: PromotionsComponent },
  { path: 'checkin', component: CheckinComponent },
  //{ path: 'demanda', component: DemandComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

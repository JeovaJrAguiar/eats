import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Order} from '../models';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly apiUrl = environment.authSerice.endpointUrl + environment.apiUrl;

  constructor(private http: HttpClient, private localStorage: StorageService) { }

  fetchOrder(orderId: number): Observable<Order> {
    const params = {
      orderId: orderId
    }

    return this.http
      .get<Order>(`${this.apiUrl}/order`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrder(order: Order): Observable<Order> {
    const token = this.localStorage.get('authorization');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${token}`
    });

    return this.http.post<Order>(`${this.apiUrl}/order`, order, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/order/${orderId}`, order)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/order/${orderId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {

    let errorMessage = "Ocorreu um erro desconhecido. Tente novamente mais tarde.";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.statusText}`;
    }

    return throwError(() => new Error(errorMessage)); // Lança o erro para quem chamou o serviço
  }
}

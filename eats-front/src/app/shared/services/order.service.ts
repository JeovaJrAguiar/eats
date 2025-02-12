import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchOrder(orderId: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${this.apiUrl}/order/${orderId}`)
      .pipe(
        catchError(this.handleError) // Adicione tratamento de erros
      );
  }

  createOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(`${this.apiUrl}/order`, order)
      .pipe(
        catchError(this.handleError) // Adicione tratamento de erros
      );
  }

  updateOrder(orderId: number, order: OrderModel): Observable<OrderModel> {
    return this.http.put<OrderModel>(`${this.apiUrl}/order/${orderId}`, order)
      .pipe(
        catchError(this.handleError) // Adicione tratamento de erros
      );
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/order/${orderId}`)
      .pipe(
        catchError(this.handleError) // Adicione tratamento de erros
      );
  }

  fetchOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.apiUrl}/order`)
      .pipe(
        catchError(this.handleError) // Adicione tratamento de erros
      );
  }

  private handleError(error: any) { // Função para tratar erros
    console.error("Ocorreu um erro:", error); // Log do erro no console

    // Aqui você pode personalizar a mensagem de erro para o usuário
    let errorMessage = "Ocorreu um erro desconhecido. Tente novamente mais tarde.";

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status) {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}, Mensagem: ${error.statusText}`;
    }

    return throwError(() => new Error(errorMessage)); // Lança o erro para quem chamou o serviço
  }
}

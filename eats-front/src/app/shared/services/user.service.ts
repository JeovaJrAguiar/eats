import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/user.model';
import {SaveUser} from '../models/save-user.model';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchUser(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`${email}:${password}`)}`
    });

    const options = { headers: headers };

    return this.http.get<User>(`${this.apiUrl}/user`, options);
  }

  login(email: string, password: string): boolean {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`${email}:${password}`)}`
    });

    this.http.get(`${this.apiUrl}/user`, { headers, observe: 'response' }).pipe(
      tap((response: any) => {
        if (response.status === 200 && response.body) {
          localStorage.setItem('user', JSON.stringify(response.body));
          return true;
        } else {
          localStorage.removeItem('user');
          return false;
          throw new Error("Erro de login");
        }
      }),
      catchError(this.handleLoginError)
    );

    return false;

    // return this.http.get<User>(`${this.apiUrl}/user`, { headers, observe: 'response' }).pipe(
    //   tap((response: HttpResponse<any>) => {
    //     if (response.status === 200) {
    //       const user = response.body;
    //       if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //       }
    //     }
    //   }),
    //   catchError(this.handleLoginError)
    // );

    // return this.http.get<User>(`${this.apiUrl}/user`, { headers, observe: 'response' }).pipe(
    //   map((response: HttpResponse<any>) => response.status === 200),
    //   tap((success) => {
    //     if (success) {
    //       localStorage.setItem('isLoggedIn', 'true');
    //     } else {
    //       localStorage.removeItem('isLoggedIn');
    //     }
    //   }),
    //   catchError(this.handleLoginError)
    // );
  }

  saveUser(user: User): Observable<boolean> {
    const params = {
      name: user.name,
      email: user.email,
      password: user.password
    }

    return this.http
      .post<SaveUser>(`${this.apiUrl}/user`, params)
      .pipe(
        catchError(this.handleSaveUserError),
        map(response => this.handleSaveUserData(response))
      );
  }

  private handleLoginError(error: any) {
    localStorage.removeItem('isLoggedIn');
    return throwError(() => new Error('Erro ao fazer login'));
  }

  private handleSaveUserData({ sucesso, mensagem }: SaveUser) {
    if (!sucesso) {
      throw new Error(mensagem);
    }
    return true;
  }

  private handleSaveUserError(error: any) {
    return throwError(() => new Error('Ocorreu um erro desconhecido'));
  }
}

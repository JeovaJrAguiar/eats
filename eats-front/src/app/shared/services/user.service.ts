import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../models/user.model';
import {SaveUser} from '../models/save-user.model';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {AuthService} from '../../core/services';
import {authGuard} from '../../core/guards';
import { StorageService } from './storage.service';
import {Order} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = environment.authSerice.endpointUrl + environment.apiUrl;

  constructor(private http: HttpClient, private localStorage: StorageService) { }

  fetchUser(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`${email}:${password}`)}`
    });

    const options = { headers: headers };

    return this.http.get<User>(`${this.apiUrl}/user`, options);
  }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: { authorization: 'Basic ' + btoa(email + ':' + password) }
    };

    return this.http.get<any>(`${this.apiUrl}/user`, httpOptions).pipe(
      tap((response: any) => {
        this.localStorage.set('userId', response.id.toString());
        this.localStorage.set('authorization', btoa(email + ':' + password));
        return response
      })
    );
  }

  saveUser(user: User): Observable<User> {
    const token = this.localStorage.get('authorization');

    const headers = new HttpHeaders({
      'Authorization': `Basic ${token}`
    });

    return this.http.post<User>(`${this.apiUrl}/user`, user, { headers })
      .pipe(
        catchError(this.handleSaveUserError),
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

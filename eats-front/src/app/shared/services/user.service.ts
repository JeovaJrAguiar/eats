import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {SaveUser} from '../models/save-user.model';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  fetchUser(userId: string): Observable<User> {
    const params = {
      userId: userId
    }

    return this.http.get<User>(`${this.apiUrl}/user`,
      { params });
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

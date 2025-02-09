import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {AUTH_COOKIE_KET, FILTER_SESSION_KEY} from "../constants/storage.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "./cookie.service";
import {SessionStorageService} from "./session-storage.service";
import {User} from "../../shared/models/user.model";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";

const DEFAULT_LOGIN_ERROR = 'Ocorreu um erro desconhecido';

const UNAUTHORAZED_LOGIN_ERROR = 'Usuário não encontrado ou sem permissão';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = environment.apiUrl;

  readonly authCookieKey = AUTH_COOKIE_KET;

  authCookie!: string;

  private readonly sessionKey = FILTER_SESSION_KEY;

  private loggedUser?: User;

  constructor(
      private http: HttpClient,
      private cookieService: CookieService,
      private sessionStorage: SessionStorageService,
  ) {
    this.loadAuthCookie();
  }

  get logged(): boolean {
    return !!this.authCookie;
  }

  get user(): User | undefined {
   return this.loggedUser;
  }

  fetchUserInfo(): Observable<User> {
    return this.http
        .get<User>(this.apiUrl + `/endpoint/do/usuario`) // TODO: definir o endpoint para inforamcoes  do usuário
        .pipe(
            tap({
              next: this.handleFetchUserInfo.bind(this),
              error: this.clearAuth.bind(this),
            })
        );
  }

  clearAuth() {
    this.cookieService.deleteCookie(this.authCookie);
    this.loggedUser = undefined;
  }

  login(userName: string, password: string): Observable<boolean> {
    return this.http
        .post<User>(
            this.apiUrl + `/login/endpoint`, {
              userName,
              password,
            }
        )
        .pipe(
          tap(this.handleLoginData.bind(this)),
          map(() => true),
          catchError(this.handleLoginError),
        )
  }

  logout(): Observable<boolean> {
    const apiUrl = environment.apiUrl;
    return this.http.post(apiUrl + `/logout/usuario/login`, {})
        .pipe(
            map(() => true),
            catchError(() => of (false)),
            tap((value) => value && this.clearAuth()),
        );
  }

  setAuthCookie(value: string) {
    this.authCookie = value;
    this.cookieService.setCookie(this.authCookieKey, value)
  }

  private handleFetchUserInfo(data: User) {
    this.loggedUser = data;
  }

  private handleLoginData(data: User) {
    this.loggedUser = data;
    this.loadAuthCookie();
  }

  private handleLoginError(error: HttpErrorResponse) {
    const message = error.status === 401 ? UNAUTHORAZED_LOGIN_ERROR : DEFAULT_LOGIN_ERROR;

    return throwError(() => new Error(message));
  }

  private loadAuthCookie() {
    this.authCookie = this.cookieService.getCookie(this.authCookieKey);
  }
}

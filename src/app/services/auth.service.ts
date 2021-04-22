import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import url from '../commen/config';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // decoder token (jwt)
  helper = new JwtHelperService();
  // default url request
  apiUrl = url.apiUrl;
  // this is default headers
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {}

  // login for business & manager
  logIn(valid, value): Observable<any> {
    if (valid) {
      return this.http.post<any>(`${this.apiUrl}/auth`, JSON.stringify(value), {
        headers: this.headers,
      });
    }
  }

  // subscribe for business & manager
  signUp(valid, value): Observable<User> {
    if (valid) {
      return this.http.post<User>(
        `${this.apiUrl}/users/new-user`,
        JSON.stringify(value),
        {
          headers: this.headers,
        }
      );
    }
  }

  // check if the token is from my server
  private getCurrentUser(): User {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
      return null;
    }
    const jwtDecode = <User>this.helper.decodeToken(jwt);

    if (jwtDecode?.user || jwtDecode?.business || jwtDecode?.manager) {
      return jwtDecode;
    } else {
      return null;
    }
  }

  getCurrentUser$: Observable<User> = new Observable<User>((subscriber) => {
    subscriber.next(this.getCurrentUser());
  });

  addToken(token) {
    localStorage.setItem('token', token);
  }

  // logout by clear token
  logout(): any {
    localStorage.clear();
  }
}

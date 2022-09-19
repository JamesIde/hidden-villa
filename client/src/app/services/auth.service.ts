import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Todo,
  User,
  LoginUser,
  RegisterUser,
  UserProfile,
} from '../shared/userModel';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import * as qs from 'qs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Set up subscriber to propagate data to the component who subscribe to it.
  todoSub = new Subject<Todo[]>();
  token = new BehaviorSubject<string>(null);
  name = new BehaviorSubject<string>(null);
  userProfile = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user: LoginUser): Observable<User> {
    const strUser = qs.stringify(user);
    return this.http
      .post<User>(environment.SERVER_DOMAIN + '/api/auth/login', strUser, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        // Must transform the output into the correct type
        map((user) => {
          return {
            id: user.id,
            success: user.success,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
          };
        }),
        tap((user) => {
          // TODO fix this
          localStorage.setItem('token', JSON.stringify(user.accessToken));
          localStorage.setItem('userID', JSON.stringify(user.id));
          localStorage.setItem('name', JSON.stringify(user.name));
          this.token.next(user.accessToken);
          this.name.next(user.name);
          //  this.autoLogout(30000);
        })
      );
  }

  registerUser(user: RegisterUser) {
    const formData = {
      email: user.email,
      name: user.name,
      password: user.password,
      password2: user.password2,
    };
    const strRegisterUser = qs.stringify(formData);
    return this.http
      .post<User>(
        environment.SERVER_DOMAIN + '/api/auth/register',
        strRegisterUser,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        // Must transform the output into the correct type
        map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
          };
        }),
        tap((user) => {
          localStorage.setItem('token', JSON.stringify(user.accessToken));
          localStorage.setItem('userID', JSON.stringify(user.id));
          this.token.next(user.accessToken);
          //  this.autoLogout(30000);
        })
      );
  }

  // Helper function to get the user from local storage
  // It then 'nexts' the user if present to all subscribing components
  autologin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    this.token.next(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('booking');
    this.token.next(null);
    this.router.navigate(['/']);
  }

  getProfile() {
    return this.http
      .get(environment.SERVER_DOMAIN + '/api/auth/profile', {})
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        tap((res: UserProfile) => {
          this.userProfile.next(res);
          console.log('Tapped here in profile call ->', res);
        })
      );
  }

  // Used for HTTP Interceptors
  getAccessToken(): string {
    return this.token.value;
  }

  getUserID(): number {
    return parseInt(localStorage.getItem('userID'));
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.next(token);
  }
}

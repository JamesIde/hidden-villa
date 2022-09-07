import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Todo,
  User,
  LoginUser,
  RegisterUser,
} from '../components/auth/userModel';
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
@Injectable({
  providedIn: 'root',
})
export class APIService {
  // Set up subscriber to propagate data to the component who subscribe to it.
  todoSub = new Subject<Todo[]>();
  token = new BehaviorSubject<string>(null);
  userProfile = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}
  readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';

  readonly BACKEND_URL = 'http://localhost:5000';

  fetchTodos() {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      map((user) => {
        return user.slice(0, 10);
      }),
      tap((user) => {
        this.todoSub.next(user);
      })
    );
  }

  loginUser(user: LoginUser): Observable<User> {
    const strUser = qs.stringify(user);
    return this.http
      .post<User>(this.BACKEND_URL + '/api/auth/login', strUser, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
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
            success: user.success,
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
          };
        }),
        tap((user) => {
          localStorage.setItem('token', JSON.stringify(user.accessToken));
          this.token.next(user.accessToken);
          //  this.autoLogout(30000);
        })
      );
  }

  registerUser(user: RegisterUser) {
    const formData = {
      email: user.email,
      name: user.name,
      password: user.password,
    };
    return this.http
      .post<User>(this.BACKEND_URL + '/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
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
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
          };
        }),
        tap((user) => {
          localStorage.setItem('token', JSON.stringify(user.accessToken));
          this.token.next(user.accessToken);
          //  this.autoLogout(30000);
        })
      );
  }

  // elper function to get the user from local storage
  // It then 'nexts' the user if present to all subscribing components
  autologin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    this.token.next(token);
  }

  // Auto logout feature
  // autoLogout(expirationDuration: number) {
  //   setTimeout(() => {
  //     this.logout();
  //     window.alert("You've been logged out due to inactivity");
  //   }, expirationDuration);
  // }

  logout() {
    localStorage.removeItem('token');
    this.token.next(null);
    this.router.navigate(['/']);
  }

  getProfile() {
    return this.http.get(this.BACKEND_URL + '/api/auth/profile', {}).pipe(
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      map((res) => {
        return res;
      }),
      tap((res) => {
        this.userProfile.next(res);
        console.log('Tapped here in profile call ->', res);
      })
    );
  }

  getAccessToken(): string {
    return this.token.value;
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.next(token);
  }
}

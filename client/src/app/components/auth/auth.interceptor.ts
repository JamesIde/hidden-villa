import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { APIService } from 'src/app/shared/API.service';

interface AccessResponse {
  ok: boolean;
  accessToken: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly REFRESH_URL = 'http://localhost:5000/api/auth/refreshAccessToken';
  isAccessValid = false;

  constructor(private http: HttpClient, private APIService: APIService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.APIService.getAccessToken();

    if (accessToken) {
      const req = request.clone({
        setHeaders: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403 || err.status == 401) {
            this.isAccessValid = true;
            console.log('Access token is invalid, refreshing...');
            return this.http
              .get<AccessResponse>(this.REFRESH_URL, {
                withCredentials: true,
              })
              .pipe(
                switchMap((res) => {
                  console.log('NEW TOKEN ->', res.accessToken);
                  this.APIService.setAccessToken(res.accessToken);
                  return next.handle(
                    request.clone({
                      setHeaders: {
                        Authorization: `Bearer ${res.accessToken}`,
                      },
                    })
                  );
                })
              ) as Observable<HttpEvent<any>>;
          }
          this.isAccessValid = false;
          return throwError(() => err);
        })
      );
    }
    return next.handle(request);
  }
}

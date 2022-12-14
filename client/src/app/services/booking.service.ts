import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import {
  BehaviorSubject,
  catchError,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Booking } from '../shared/hotelModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private stripeService: StripeService) {}
  latestBooking = new BehaviorSubject<any>(null);

  handleCheckout(booking: Booking) {
    // Create the session, redirect to the session url, subscribe to the result if error
    this.http
      .post(
        environment.SERVER_DOMAIN + '/api/payment/create-checkout-session',
        booking
      )
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        switchMap((session) => {
          console.log(session);
          return this.stripeService.redirectToCheckout({
            sessionId: session as string,
          });
        })
      )
      .subscribe((result) => {
        console.log('HELLO!');
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

  fetchLatestBooking() {
    return this.http
      .get(environment.SERVER_DOMAIN + '/api/auth/latestBooking')
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        tap((booking) => {
          this.latestBooking.next(booking);
        })
      );
  }

  getOrderDetails(paymentID: string) {
    return this.http
      .get(environment.SERVER_DOMAIN + '/api/payment/booking/' + paymentID)
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';
import { Booking } from '../shared/hotelModel';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private stripeService: StripeService) {}
  readonly SERVER_DOMAIN = 'http://localhost:5000';
  latestBooking = new BehaviorSubject<any>(null);

  handleCheckout(booking: Booking) {
    // Create the session, redirect to the session url, subscribe to the result if error
    this.http
      .post(
        this.SERVER_DOMAIN + '/api/payment/create-checkout-session',
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
    return this.http.get(this.SERVER_DOMAIN + '/api/auth/latestBooking').pipe(
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      tap((booking) => {
        this.latestBooking.next(booking);
      })
    );
  }

  // Methods in here
  // 1. checkout --> stripe/create-checkout-session
  // 2. Create checkout (needs stripe ID)
  // 3. getBooking --> stripe/get-booking
  // Methods in backend
  // 1. create-checkout-session
  // 2. get-booking
  // 3. get-bookings
}

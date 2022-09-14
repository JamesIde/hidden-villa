import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { HotelRoomModule } from '../components/hotelRoom/hotelRoom.module';
import { BookingInfo, HotelRoom } from '../shared/hotelModel';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  readonly SERVER_DOMAIN = 'http://localhost:5000';
  bookingInfo = new BehaviorSubject<BookingInfo>(null);
  availableRooms = new BehaviorSubject<HotelRoom[]>(null);
  selectedRoom = new BehaviorSubject<HotelRoom>(null);

  storeBookingInformation(form: FormGroup) {
    let checkIn: string = form.value.checkIn.toISOString().split('T')[0];
    let checkOut: string = form.value.checkOut.toISOString().split('T')[0];
    let NoGuests = form.value.NoGuests;
    // Get original dates
    let originalCheckIn = form.value.checkIn;
    let originalCheckOut = form.value.checkOut;
    const booking: BookingInfo = {
      // YYYY-MM-DD & Number
      // checkIn,
      // checkOut,
      originalCheckIn,
      originalCheckOut,
      NoGuests,
      duration: this.calculateDuration(checkIn, checkOut),
    };
    // Emit it & store
    this.bookingInfo.next(booking);
    localStorage.setItem('booking', JSON.stringify(booking));
  }

  // Fetch rooms and emit them in behaviour subject
  getallRooms() {
    return this.http.get<HotelRoom[]>(`${this.SERVER_DOMAIN}/api/hotels`).pipe(
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      tap((rooms) => {
        this.availableRooms.next(rooms);
      })
    );
  }
  bookRoom(id: number) {
    return this.http
      .get<HotelRoom>(`${this.SERVER_DOMAIN}/api/hotels/${id}`)
      .pipe(
        catchError((err) => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(() => err);
        }),
        tap((room) => this.selectedRoom.next(room))
      );
  }

  calculateDuration(checkIn: string, checkOut: string) {
    let date1 = new Date(checkIn);
    let date2 = new Date(checkOut);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  calculateTotalCost(duration: number, price: number) {
    return duration * price;
  }

  getBookingDuration(): number {
    const booking = localStorage.getItem('booking');
    if (booking) {
      const bookingInfo = JSON.parse(booking);
      return bookingInfo.duration;
    }
    return 0;
  }

  getBooking(): BookingInfo {
    const booking = localStorage.getItem('booking');
    if (booking) {
      const bookingInfo = JSON.parse(booking);
      console.log('from ls: ', bookingInfo);
      return bookingInfo;
    }
    return null;
  }
}

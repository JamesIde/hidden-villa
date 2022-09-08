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
import { BookingInfo, HotelRoom } from '../shared/HotelInfoModel';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}
  // TODO move to constants
  readonly API_URL = 'http://localhost:5000';
  bookingInfo = new BehaviorSubject<BookingInfo>(null);
  availableRooms = new BehaviorSubject<HotelRoom[]>(null);
  selectedRoom = new BehaviorSubject<HotelRoom>(null);

  storeBookingInformation(form: FormGroup) {
    const dates: BookingInfo = {
      // YYYY-MM-DD & Number
      checkIn: form.value.checkIn.toISOString().split('T')[0],
      checkout: form.value.checkOut.toISOString().split('T')[0],
      NoGuests: form.value.NoGuests,
    };
    this.bookingInfo.next(dates);
    localStorage.setItem('booking', JSON.stringify(dates));
  }

  // Fetch rooms and next them in behaviour subject
  getallRooms() {
    return this.http.get<HotelRoom[]>(`${this.API_URL}/api/hotels`).pipe(
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      tap((rooms) => this.availableRooms.next(rooms))
    );
  }
  getRoom(id: number) {
    return this.http.get<HotelRoom>(`${this.API_URL}/api/hotels/${id}`).pipe(
      catchError((err) => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(() => err);
      }),
      tap((room) => this.selectedRoom.next(room))
    );
  }
}

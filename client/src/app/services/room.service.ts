import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BookingInfo } from '../shared/HotelInfoModel';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}
  bookingInfo = new BehaviorSubject<BookingInfo>(null);

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
}

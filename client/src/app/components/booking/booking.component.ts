import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  constructor(private bookingService: BookingService) {}
  bookingSub!: Subscription;
  bookingDetails!: any;
  isLoading!: boolean;

  ngOnInit(): void {
    this.isLoading = true;
    this.bookingSub = this.bookingService
      .fetchLatestBooking()
      .subscribe((booking) => {
        this.bookingDetails! = booking;
        this.isLoading = false;
        console.log(this.bookingDetails);
      });
  }

  ngOnDestroy(): void {
    this.bookingSub.unsubscribe();
  }
}

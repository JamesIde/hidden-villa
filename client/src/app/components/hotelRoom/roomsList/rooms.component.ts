import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import { BookingInfo, HotelRoom } from 'src/app/shared/hotelModel';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}
  bookingSubscription!: Subscription;
  roomSubscription!: Subscription;
  bookingInfo!: any;
  rooms!: HotelRoom[];
  isError = false;
  error!: string;
  isLoading = false;

  // Test
  checkIn: any;
  checkOut: any;
  guests: number;
  ngOnInit(): void {
    this.isLoading = true;
    // Access booking info
    this.bookingSubscription = this.roomService.bookingInfo.subscribe(
      (data) => {
        this.bookingInfo = data ? data : this.roomService.getStoredBooking();
        this.checkIn = this.roomService.formatDateToYMD(
          this.bookingInfo.originalCheckIn
        );
        this.checkOut = this.roomService.formatDateToYMD(
          this.bookingInfo.originalCheckOut
        );
        this.guests = this.bookingInfo.NoGuests;
        console.log(this.checkIn, this.checkOut, this.guests);
      }
    );
    // Access available rooms
    this.roomSubscription = this.roomService.getallRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
        console.log('rooms', this.rooms);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        this.error = error.message;
        console.log(this.error);
      }
    );
  }
  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }

  setErrorTimeout() {
    // setTimeout(() => {
    //   this.isError = false;
    // }, 5000);
  }

  updateBooking() {
    let newCheckIn = this.roomService.formatDateToDMY(this.checkIn);
    let newCheckOut = this.roomService.formatDateToDMY(this.checkOut);

    // Calculate duration
    let duration = this.roomService.calculateDuration(
      this.checkIn,
      this.checkOut
    );

    let newBooking = {
      originalCheckIn: newCheckIn,
      originalCheckOut: newCheckOut,
      duration: duration,
      NoGuests: this.guests,
    };

    this.roomService.bookingInfo.next(newBooking);
    localStorage.setItem('booking', JSON.stringify(newBooking));
    this.roomService.getallRooms().subscribe((rooms) => {
      this.rooms = rooms;
      console.log('rooms', this.rooms);
      this.isLoading = false;
    });
  }
}

/*
How does the update room work?
By emitting a new value in the roomService bookingInfo subject,
the component rerenders because the bookingInfo is subscribed to, this updates the dates in the UI.
However, we must call the getallRooms() method again to get the updated rooms.
*/

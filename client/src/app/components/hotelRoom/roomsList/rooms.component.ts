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
  bookingInfo!: BookingInfo;
  rooms!: HotelRoom[];
  isError!: boolean;
  isLoading = false;

  originalCheckIn;
  originalCheckOut;

  originalCheckInYear!: number;
  originalCheckInMonth!: number;
  originalCheckInDay!: number;

  originalCheckOutYear!: number;
  originalCheckOutMonth!: number;
  originalCheckOutDay!: number;

  campaignOne!: FormGroup;

  ngOnInit(): void {
    this.isLoading = true;
    // Access booking info
    this.bookingSubscription = this.roomService.bookingInfo.subscribe(
      (data) => {
        this.bookingInfo = data ? data : this.roomService.getBooking();
      }
    );
    // Access available rooms
    this.roomSubscription = this.roomService.availableRooms.subscribe(
      (rooms) => {
        this.rooms = rooms;
        // console.log('Rooms: ', rooms);
        this.isLoading = false;
      }
    );

    // Get original year, month and day from booking
    // Convert string to date
    this.originalCheckIn = new Date(this.bookingInfo.originalCheckIn);
    this.originalCheckOut = new Date(this.bookingInfo.originalCheckOut);

    this.originalCheckInYear = this.originalCheckIn.getFullYear();
    this.originalCheckInMonth = this.originalCheckIn.getMonth();
    this.originalCheckInDay = this.originalCheckIn.getDate();

    this.originalCheckOutYear = this.originalCheckOut.getFullYear();
    this.originalCheckOutMonth = this.originalCheckOut.getMonth();
    this.originalCheckOutDay = this.originalCheckOut.getDate();

    this.campaignOne = new FormGroup({
      // Set start to original check in year, month, dayt
      start: new FormControl(
        new Date(
          this.originalCheckInYear,
          this.originalCheckInMonth,
          this.originalCheckInDay
        )
      ),
      end: new FormControl(
        new Date(
          this.originalCheckOutYear,
          this.originalCheckOutMonth,
          this.originalCheckOutDay
        )
      ),
    });
  }
  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }
}

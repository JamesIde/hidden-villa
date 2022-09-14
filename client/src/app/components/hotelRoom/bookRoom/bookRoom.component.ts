import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';
import { BookingInfo, HotelRoom, Booking } from 'src/app/shared/hotelModel';

@Component({
  selector: 'app-book-room',
  templateUrl: './bookRoom.component.html',
  styleUrls: ['./bookRoom.component.css'],
})
export class BookRoomComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}
  // Subscriptions
  selectedRoom!: Subscription;
  bookingOrder!: Subscription;
  // Local state
  roomDetails!: HotelRoom;
  dateDetails!: BookingInfo;
  totalCost!: number;
  // Contact Info form
  userInfo!: FormGroup;

  // Booking method
  handleBookingSubmit() {
    // Format to match the database
    const formatCheckIn = new Date(
      this.dateDetails.originalCheckIn
    ).toLocaleDateString();
    const formatCheckOut = new Date(
      this.dateDetails.originalCheckOut
    ).toLocaleDateString();

    let booking: Booking = {
      firstName: this.userInfo.value.firstName,
      lastName: this.userInfo.value.lastName,
      email: this.userInfo.value.email,
      phone: this.userInfo.value.phone,
      checkIn: formatCheckIn,
      checkOut: formatCheckOut,
      duration: this.dateDetails.duration,
      roomId: this.roomDetails.roomId,
      roomName: this.roomDetails.name,
      roomPrice: this.roomDetails.price,
      totalCost: this.totalCost,
      NoGuests: this.roomDetails.maxGuests,
      userID: this.authService.getUserID(),
    };
    console.log(booking);
    this.bookingService.handleCheckout(booking);
  }

  ngOnInit(): void {
    // Subscribe to selected room
    this.selectedRoom = this.roomService.selectedRoom.subscribe((room) => {
      this.roomDetails = room;
    });
    // Subscribe to get booking information
    this.bookingOrder = this.roomService.bookingInfo.subscribe((dates) => {
      // CheckIn, out, duration
      this.dateDetails = dates ? dates : this.roomService.getBooking();
      console.log('Dates: ', this.dateDetails);
      // Total cost
      this.totalCost = this.roomService.calculateTotalCost(
        this.dateDetails.duration,
        this.roomDetails.price
      );
    });

    // Initialise the form
    this.userInfo = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}

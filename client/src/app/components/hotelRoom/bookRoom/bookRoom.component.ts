import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  // Subscriptions
  selectedRoom!: Subscription;
  bookingOrder!: Subscription;
  userStatus!: Subscription;
  // Local state
  roomDetails!: HotelRoom;
  dateDetails!: BookingInfo;
  totalCost!: number;
  // Contact Info form
  userInfo!: FormGroup;
  isLoading = false;
  // User status
  isLogged = false;

  // Booking method
  handleBookingSubmit() {
    let booking: Booking = {
      firstName: this.userInfo.value.firstName,
      lastName: this.userInfo.value.lastName,
      email: this.userInfo.value.email,
      phone: this.userInfo.value.phone,
      checkIn: this.dateDetails.originalCheckIn,
      checkOut: this.dateDetails.originalCheckOut,
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
    // Access the room by quering off id params
    this.isLoading = true;
    this.selectedRoom = this.roomService
      .bookRoom(this.route.snapshot.params['id'])
      .subscribe((room) => {
        this.roomDetails = room;
        this.isLoading = false;
        // After setting the room, fetch the booking information
        this.bookingOrder = this.roomService.bookingInfo.subscribe((dates) => {
          this.dateDetails = dates
            ? dates
            : this.roomService.getStoredBooking();
          // Then calculate the cost
          this.totalCost = this.roomService.calculateTotalCost(
            this.dateDetails.duration,
            this.roomDetails.price
          );
          this.isLoading = false;
        });
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

    this.userStatus = this.authService.token.subscribe((token) => {
      this.isLogged = token ? true : false;
    });
  }
}

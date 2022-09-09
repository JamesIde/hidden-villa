import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';
import {
  BookingInfo,
  HotelRoom,
  OrderInfo,
} from 'src/app/shared/HotelInfoModel';

@Component({
  selector: 'app-book-room',
  templateUrl: './bookRoom.component.html',
  styleUrls: ['./bookRoom.component.css'],
})
export class BookRoomComponent implements OnInit {
  constructor(private roomService: RoomService) {}
  // Subscriptions
  selectedRoom!: Subscription;
  selectedDates!: Subscription;
  // Local state
  roomDetails!: HotelRoom;
  dateDetails!: BookingInfo;
  orderDetails!: {
    duration: number;
    cost: number;
    totalCost: number;
  };
  // Contact Info form
  userInfo!: FormGroup;

  // Booking
  handleBookingSubmit() {}

  ngOnInit(): void {
    // Subscribe to selected room
    this.selectedRoom = this.roomService.selectedRoom.subscribe((room) => {
      console.log('Selected Room: ', room);
      this.roomDetails = room;
    });
    // Subscribe to user selected dates
    this.selectedDates = this.roomService.bookingInfo.subscribe((dates) => {
      console.log('Date details: ', dates);
      this.dateDetails = dates;
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
    // Calculate the duration
    this.calculateDuration();
    // Calculate the total price
  }

  // Calculate the duration
  calculateDuration(): void {
    const checkIn = new Date(this.dateDetails.checkIn);
    const checkOut = new Date(this.dateDetails.checkOut);
    const duration = checkOut.getTime() - checkIn.getTime();
    console.log(duration / (1000 * 3600 * 24));
    this.orderDetails.duration = duration / (1000 * 3600 * 24);
    console.log(this.orderDetails.duration);
  }
  // Calculate the total cost
  calculateTotalCost(): void {
    this.orderDetails.totalCost =
      this.roomDetails.price * this.orderDetails.duration;
  }
}

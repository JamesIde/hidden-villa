import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  constructor(private roomService: RoomService) {}

  bookingSubscription!: Subscription;
  testBooking;
  ngOnInit(): void {
    console.log('Init loaded');
    this.bookingSubscription = this.roomService.bookingInfo.subscribe(
      (data) => {
        this.testBooking = data;
        console.log('data: ', data);
      }
    );
  }

  ngOnDestroy(): void {
    this.bookingSubscription.unsubscribe();
  }
}
